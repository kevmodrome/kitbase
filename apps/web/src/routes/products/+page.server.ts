import type { PageServerLoad } from './$types'

import { loadProductsAndCategories } from '$lib/helpers/loaders';

export const load: PageServerLoad = loadProductsAndCategories