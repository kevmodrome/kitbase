import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return {}
    }

    return {
        user: {
            email: locals.user.email,
            profile: {
                avatar: locals.user?.profile?.avatar,
                name: locals.user?.profile?.name,
                role: locals.user?.profile?.role 
            }
        }
    };
};