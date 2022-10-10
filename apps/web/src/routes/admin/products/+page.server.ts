import type PocketBase from 'pocketbase'
import type { PageServerLoad } from './$types'
import type { Actions, RequestEvent } from '@sveltejs/kit'

type Product = {
    name: string,
    price: number,
    id: string
}

export const load: PageServerLoad = async ({ locals }) => {
    const products = await getProducts(locals.pb)
    
    return {    
        products
    };
};

export const actions: Actions = {
    create: async ({ locals, request }: RequestEvent) => {
        const data = await request.formData();

        const newProduct = {
            name: data.get('name'),
            price: data.get('price')
        }

        const result = await locals.pb.records.create('pro  ducts', newProduct)

        return { success: true, result: structuredClone(result)  };
    },
    delete: async ({ locals, request, platform }: RequestEvent) => {
        const data = await request.formData()
        const id = (data.get('id') as string).toString()

        await locals.pb.records.delete('products', id)

        return { success: true }
    }
};

async function getProducts(pb: PocketBase): Promise<Product[]> {
    const { items } = await pb.records.getList('products')

    return structuredClone(items)
}