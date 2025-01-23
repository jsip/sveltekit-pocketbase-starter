import { API } from '$lib/server/client';
import { error } from '@sveltejs/kit';

export const actions = {
	reset: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const api = new API(locals.pb);
			await api.requestPasswordReset(body.email.toString());

			return {
				success: true
			};
		} catch (err) {
			console.error('Error: ', err);
			throw error(500, 'Something went wrong');
		}
	}
};
