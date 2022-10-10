import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
    if (locals?.user?.profile?.role !== 'admin') {
        throw redirect(307, '/login')
    }
}   