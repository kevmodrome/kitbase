import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit'

import { loadSingleProductAndCategories } from '$lib/helpers/loaders'

import { getProduct } from '$lib/helpers/products';

export const load: PageServerLoad = loadSingleProductAndCategories

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

        // Update KV cache
        const product = await getProduct(locals.pb, id)
        await platform.env?.CACHE_SPACE.put(id, JSON.stringify(product))

        return { success: true, result: structuredClone(result) };
    },
  };