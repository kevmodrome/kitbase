import type { Handle } from '@sveltejs/kit'
import PocketBase, { User } from 'pocketbase'
import { fallBackPlatformToMiniFlareInDev } from '$lib/miniflare'
import { API_URL } from '$env/static/private'
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
    if (dev) {
		event.platform = await fallBackPlatformToMiniFlareInDev(event.platform);  
    }

    event.locals.pb = new PocketBase(API_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    try {
      // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
      if (event.locals.pb.authStore.isValid) {
        await event.locals.pb.users.refresh();
      }
    } catch (_) {
      // clear the auth store on failed refresh
      event.locals.pb.authStore.clear();
    }

    if (event.locals.pb.authStore.isValid) {
        event.locals.user = event.locals.pb.authStore.model as User
    }
   
    return await resolve(event)
  }