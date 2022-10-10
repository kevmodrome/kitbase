import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
    return {
        methods: (await event.locals.pb.users.listAuthMethods()).authProviders
    }
}   