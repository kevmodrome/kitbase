import type { RequestEvent } from '@sveltejs/kit'
import type { Actions } from '@sveltejs/kit'
import { getProduct } from '$lib/helpers/products';

export const actions: Actions = {
    create: async ({ locals, request, platform }: RequestEvent) => {
        const data = await request.formData();

        const newProduct = {
            name: data.get('name'),
            price: data.get('price'),
            categories: [data.get('category')]
        }

        const result = await locals.pb.records.create('products', newProduct)
        const product = await getProduct(locals.pb, result.id)
        const cacheRes = new Response(JSON.stringify(product), {
            headers: { "Cache-Control": "max-age=3600" }
        })
        await platform.cache.put(`products:${product.id}`, cacheRes)

        return { success: true, result: structuredClone(result)  };
    },
    update: async ({ locals, request, platform }: RequestEvent) => {
        const data = await request.formData();
        const id = data.get('id') as string

        const updateProduct = {
            name: data.get('name'),
            price: data.get('price'),
            categories: [data.get('category')]
        }

        const result = await locals.pb.records.update('products', id, updateProduct)

        console.log(result)

        // Update CF cache
        const product = await getProduct(locals.pb, id)
        await platform.env?.CACHE_SPACE.put(id, JSON.stringify(product))

        return { success: true, result: structuredClone(result) };
    },
    delete: async ({ locals, request, platform }: RequestEvent) => {
        const data = await request.formData()
        const id = data.get('id') as string
        
        await Promise.all([await locals.pb.records.delete('products', id), await platform.caches.delete(`products:${id}`)])

        return { success: true }
    },
    createCategory: async ({ locals, request }: RequestEvent) => {
        const data = await request.formData();

        const result = await locals.pb.records.create('product_categories', { name: data.get('name') })

        return { success: true, result: structuredClone(result)  };
    },
};