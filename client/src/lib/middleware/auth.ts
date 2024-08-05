import { API } from '$lib/server/client';
import { redirect } from '@sveltejs/kit';

export const loginRedirectIfInvalidAuth = (locals: any) => {
	const api = new API(locals.pb);
	if (!api.isAuthValid()) {
		throw redirect(303, '/auth/login');
	}
};
