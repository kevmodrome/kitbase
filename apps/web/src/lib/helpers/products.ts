import type PocketBase from 'pocketbase'
import type { Product } from '$lib/types'
import type { KVNamespace } from 'miniflare'

export async function getProducts(pb: PocketBase): Promise<Product[]> {
    const { items } = await pb.records.getList('products', 1, 30, { expand: 'categories' })

    const mergedCategories = items.map(item => ({
        ...item,
        categories: item['@expand'].categories
    } as Product))

    return structuredClone(mergedCategories)
}

export async function getProduct(pb: PocketBase, id: string): Promise<Product> {
    const product = await pb.records.getOne('products', id, { expand: 'categories' }) as Product

    return structuredClone(product)
}

export async function getCachedProduct(cache: KVNamespace, id: string): Promise<Product[]> {
    const product = await cache.get(id)

    if (!product) {
        throw Error('No items found')
    }

    return JSON.parse(product)
}