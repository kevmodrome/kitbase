import { getCategories } from '$lib/helpers/categories';
import { getProducts, getProduct, getCachedProduct } from '$lib/helpers/products';

export const loadProductsAndCategories = async ({ locals }) => {
    const [products, categories] = await Promise.all([await getProducts(locals.pb), await getCategories(locals.pb)])
    
    return {    
        products,
        categories
    };
};

export const loadSingleProductAndCategories = async ({ params, locals, platform }) => {
    const [product, categories] = await Promise.all([
        Promise.any([
            getProduct(locals.pb, params.id), 
            getCachedProduct(platform.env?.CACHE_SPACE, params.id)
        ]),
        await getCategories(locals.pb)
    ])

    return {    
        product,
        categories
    };
};