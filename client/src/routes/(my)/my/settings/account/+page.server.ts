import { error, fail } from '@sveltejs/kit';
import { updateEmailSchema, updateUsernameSchema } from '$lib/types/user_schemas';
import { validateData } from '$lib/utils/utils';
import { API } from '$lib/server/client';

export const load = ({ locals }) => {};

export const actions = {
	updateEmail: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateEmailSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const api = new API(locals.pb);
			await api.requestEmailChange(formData.email);
		} catch (err: any) {
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const api = new API(locals.pb);
			if (await api.isUsernameAvailable(formData.username)) {
				const { username } = await api.updateUsername(locals.user?.id, formData.username);
				if (!locals.user) {
					throw error(500, "'locals.user' is null");
				}

				locals.user.username = username;
			}
		} catch (err: any) {
			console.error('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};
