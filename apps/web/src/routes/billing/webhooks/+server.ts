import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private'
import Stripe from 'stripe'

export const POST: RequestHandler = async ({ request }) => {
    const stripe = new Stripe(STRIPE_KEY, {
        apiVersion: '2022-08-01'
    })

    // Convert body to correct format in order to correctly constructEvent and check signature using Stripe
    const _rawBody = await request.arrayBuffer();
    const payload = toBuffer(_rawBody);

    const sig = request.headers.get('stripe-signature') as string
  
    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`);
        throw error(401)
    } 

    // Cast event data to Stripe object
    if (event.type === 'payment_intent.succeeded') {
        const stripeObject: Stripe.PaymentIntent = event.data
          .object as Stripe.PaymentIntent;
        console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
      } else if (event.type === 'charge.succeeded') {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💵 Charge id: ${charge.id}`);
      } else {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      }

    return new Response(JSON.stringify({ received: true }))
}

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}