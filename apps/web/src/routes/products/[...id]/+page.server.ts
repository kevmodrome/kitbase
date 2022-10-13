import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit'

import { getProduct, getCachedProduct } from '$lib/helpers/products';
import { getCategories } from '$lib/helpers/categories';

export const load: PageServerLoad = async ({ params, locals, platform, parent }) => {
    await parent()
    const [id, modal] = params.id.split('/')
    const [product, categories] = await Promise.all([
        Promise.any([
            getProduct(locals.pb, id), 
            getCachedProduct(platform.env?.CACHE_SPACE, id)
        ]),
        await getCategories(locals.pb) 
    ])

    return {    
        isEditing: modal === 'edit' ? true : false,
        product,
        categories
    };
};

export const actions: Actions = {
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

        // Update KV cache
        const product = await getProduct(locals.pb, id)
        await platform.env?.CACHE_SPACE.put(id, JSON.stringify(product))

        return { success: true, result: structuredClone(result) };
    },
  };