import type PocketBase from 'pocketbase'
import type { Category } from '$lib/types'

export async function getCategories(pb: PocketBase): Promise<Category[]> {
    const { items } = await pb.records.getList('product_categories')

    return structuredClone(items as Category[])
}