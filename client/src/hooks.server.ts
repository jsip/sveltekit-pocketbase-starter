import { loginRedirectIfInvalidAuth } from '$lib/middleware/auth';
import { createInstance } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pb = createInstance();

	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	try {
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh();
		}
	} catch (e: any) {
		console.error('Error: ', e);
		pb.authStore.clear();
	}

	event.locals.pb = pb;
	event.locals.user = pb.authStore.model;

	loginRedirectIfInvalidAuth(event.locals);

	const response = await resolve(event);

	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
