import type { KVNamespace } from 'miniflare'
import type PocketBase, { User } from 'pocketbase'
import type { CacheInterface } from '@miniflare/cache'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			pb: PocketBase
			user: User
		}
		// interface PageData {}
		interface Error {}
		interface Platform {
			env?: {
				CACHE_SPACE: KVNamespace
			}
			cache: CacheInterface
		}
	}
}
