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

        const result = await locals.pb.records.create('products', newProduct, { expand: 'categories' })
        const cacheRes = new Response(JSON.stringify(result), {
            headers: { "Cache-Control": "max-age=31536000" }
        })
        await platform.cache.put(`products:${result.id}`, cacheRes)

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

        const result = await locals.pb.records.update('products', id, updateProduct, { expand: 'categories' })

        // Update CF cache
        const cacheRes: Response = new Response(JSON.stringify(result), {
            headers: { "Cache-Control": "max-age=31536000" }
        })
        await platform.cache.put(`products:${id}`, cacheRes)

        return { success: true, result: structuredClone(result) };
    },
    delete: async ({ locals, request, platform }: RequestEvent) => {
        const data = await request.formData()
        const id = data.get('id') as string

        await await locals.pb.records.delete('products', id)

        return { success: true }
    },
    createCategory: async ({ locals, request }: RequestEvent) => {
        const data = await request.formData();

        const result = await locals.pb.records.create('product_categories', { name: data.get('name') })

        return { success: true, result: structuredClone(result)  };
    },
};