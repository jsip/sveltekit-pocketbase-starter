import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { updateProfileSchema } from '$lib/types/user_schemas';
import { validateData } from '$lib/utils/utils';
import { serialize } from 'object-to-formdata';
import { loginRedirectIfInvalidAuth } from '$lib/middleware/auth';
import { API } from '$lib/server/client';

export const load: PageServerLoad = ({ locals }) => {
	loginRedirectIfInvalidAuth(locals);
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		try {
			const body = await request.formData();
			if (
				body.has('avatar') &&
				body.get('avatar') instanceof File &&
				(body.get('avatar') as File).size === 0
			) {
				body.delete('avatar');
			}

			const { formData, errors } = await validateData(body, updateProfileSchema);

			if (errors) {
				return fail(400, { data: formData, errors: errors.fieldErrors });
			}

			const api = new API(locals.pb);
			const { name, avatar } = await api.updateUser(locals.user?.id, serialize(formData));

			if (locals.user) {
				locals.user.name = name;
				locals.user.avatar = avatar;
			}

			return { success: true };
		} catch (err) {
			console.error('Error updating profile:', err);
			throw error(500, 'Failed to update profile.');
		}
	}
};
