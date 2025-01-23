import { loginRedirectIfInvalidAuth } from '$lib/middleware/auth';
import { API } from '$lib/server/client';
import { validateRecord } from '$lib/utils/records';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	loginRedirectIfInvalidAuth(locals);

	const api = new API(locals.pb);

	return {};
};

export const actions = {
	searchDeals: async ({ request, locals }) => {
		try {
			const { formData, errors } = await validateRecord(request, locals.user?.id, null);

			if (errors) {
				return fail(400, { data: formData, errors: errors.fieldErrors });
			}

			const query = formData.query as string;

			const api = new API(locals.pb);

			return JSON.stringify({
				success: true
			});
		} catch (err) {
			console.error('Error searching:', err);
			throw error(500, 'Failed to query.');
		}
	}
};
