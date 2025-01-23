import { error, fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/types/user_schemas';
import { validateData } from '$lib/utils/utils';
import { API } from '$lib/server/client';
import { generateUsername } from '$lib/utils/user';

export const actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const username = generateUsername(formData.email);

		try {
			const api = new API(locals.pb);
			await api.createUser(username, formData.email, formData.password, formData.passwordConfirm);
			// await api.validateUserEmail(user.email);

			await api.login(formData.email, formData.password);

			if (!api.isAuthValid()) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.error('Error: ', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/');
	}
};
