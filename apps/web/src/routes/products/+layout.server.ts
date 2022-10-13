import { getProducts } from '$lib/helpers/products';
import { getCategories } from '$lib/helpers/categories';
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
    const [products, categories] = await Promise.all([await getProducts(locals.pb), await getCategories(locals.pb)])
    
    return {    
        products,
        categories
    };
};