import type { RequestHandler } from './$types'
import { redirect } from '@sveltejs/kit'
import { GITHUB_REDIRECT_URL } from '$env/static/private'

export const GET: RequestHandler = async ({locals, cookies, url}) => {
    const { authProviders} = await locals.pb.users.listAuthMethods()
    const { name, codeVerifier } = authProviders[0]

    const { user, meta } = await locals.pb.users.authViaOAuth2(
        name,
        url.searchParams.get('code'),
        codeVerifier,
        GITHUB_REDIRECT_URL
    )

    if (!user?.profile?.role) {
        await locals.pb.records.update("profiles", user.profile.id, { name: meta.name, avatar: meta.avatarUrl, role: 'user'  });
        await locals.pb.users.refresh();
    }

    cookies.set(locals.pb.authStore.exportToCookie())

    throw redirect(303, '/account')
}