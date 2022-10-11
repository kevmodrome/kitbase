import type { PageServerLoad } from './$types'

export const prerender = true

export const load: PageServerLoad = async (event) => {
    return {
        methods: (await event.locals.pb.users.listAuthMethods()).authProviders
    }
}   