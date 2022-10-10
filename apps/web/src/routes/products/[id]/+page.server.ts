import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit'
import type { KVNamespace } from 'miniflare'

type Product = {
    name: string,
    price: number,
    id: string
}

export const load: PageServerLoad = async ({ params, locals, platform }) => {
    const product = await Promise.any([getProduct(locals.pb, params.id), getCachedProduct(platform.env?.CACHE_SPACE, params.id)]) as Product
    
    return {    
        product
    };
};

export const actions: Actions = {
    update: async ({ locals, request, platform }: RequestEvent) => {
        const data = await request.formData();
        const id = data.get('id') as string

        const updateProduct = {
            name: data.get('name'),
            price: data.get('price'),
        }

        const result = await locals.pb.records.update('products', id, updateProduct)

        // Update KV cache
        const product = await getProduct(locals.pb, id)
        await platform.env?.CACHE_SPACE.put(id, JSON.stringify(product))

        return { success: true, result: structuredClone(result) };
    },
  };

async function getProduct(pb, id: string): Promise<Product> {
    const product = await pb.records.getOne('products', id, { expand: 'category' })

    return JSON.parse(JSON.stringify(product))
}

async function getCachedProduct(cache: KVNamespace, id: string): Promise<Product[]> {
    const product = await cache.get(id)

    if (!product) {
        throw Error('No items found')
    }

    return JSON.parse(product)
}