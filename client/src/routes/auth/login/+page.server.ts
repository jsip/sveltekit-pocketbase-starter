import type { Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils/utils';
import { loginUserSchema } from '$lib/types/user_schemas';
import { API } from '$lib/server/client';

export const load = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		return redirect(303, '/my/home');
	}

	return {};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const api = new API(locals.pb);
			await api.login(formData.email, formData.password);

			if (!api.isAuthValid()) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err: any) {
			console.error('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/home');
	}
};
