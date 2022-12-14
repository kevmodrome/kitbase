import type { Actions } from './$types';
import type { RequestEvent } from '@sveltejs/kit'
import { applyAction } from '$app/forms';

export const actions: Actions = {
    update: async ({ cookies, locals, request }: RequestEvent) => {
        const data = await request.formData();

        const updatedProfile = await locals.pb.records.update("profiles", locals.user.profile.id, { name: data.get('name') });

        await locals.pb.users.refresh()
        
        cookies.set(locals.pb.authStore.exportToCookie())

        return { success: true };
    },
  };