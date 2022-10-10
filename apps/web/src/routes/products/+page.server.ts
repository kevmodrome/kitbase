import type { PageServerLoad } from './$types'
import type PocketBase from 'pocketbase'
import type { Actions, RequestEvent } from '@sveltejs/kit'

type Product = {
    name: string,
    price: number,
    category: string,
    id: string
}

export const load: PageServerLoad = async ({ locals }) => {
    const products = await getProducts(locals.pb)
    
    return {    
        products
    };
};

async function getProducts(pb: PocketBase) {
    const { items } = await pb.records.getList('products', 1, 30, { expand: 'categories' })

    return structuredClone(items)
}