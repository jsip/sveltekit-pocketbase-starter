import { error, fail } from '@sveltejs/kit';
import { updatePasswordSchema } from '$lib/types/user_schemas';
import { validateData } from '$lib/utils/utils';
import { API } from '$lib/server/client';

export const load = ({ locals }) => {};

export const actions = {
	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

		if (errors) {
			return fail(400, {
				errors: errors.fieldErrors
			});
		}

		try {
			const api = new API(locals.pb);
			await api.updateUser(locals.user?.id, formData);
		} catch (err) {
			console.error('Error: ', err);
			throw error(500, 'Internal Server Error');
		}
	}
};
