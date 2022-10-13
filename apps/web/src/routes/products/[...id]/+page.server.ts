import type { PageServerLoad } from './$types';

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