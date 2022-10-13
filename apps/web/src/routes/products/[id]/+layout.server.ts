import type { LayoutServerLoad } from './$types';

import { getProduct, getCachedProduct } from '$lib/helpers/products';
import { getCategories } from '$lib/helpers/categories';

export const load: LayoutServerLoad = async ({ params, locals, platform, parent }) => {
    await parent()
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