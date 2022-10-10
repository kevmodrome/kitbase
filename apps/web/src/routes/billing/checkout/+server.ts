import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { STRIPE_KEY } from '$env/static/private'
import Stripe from 'stripe'

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData()

    const price = data.get('id') as string
    const quantity = parseInt(data.get('quantity') as string) || 1
    const type = data.get('type') || 'subscription'

    const stripe = new Stripe(STRIPE_KEY, {
        apiVersion: '2022-08-01'
    })
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price,
                quantity
            }
        ],
        mode: type as Stripe.Checkout.Session.Mode,
        success_url: 'http://localhost:5173/billing/checkout/success',
        cancel_url: 'http://localhost:5173/billing/checkout/cancel'
    })

    throw redirect(303, session.url || '')
}