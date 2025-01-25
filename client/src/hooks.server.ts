import { createInstance } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
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

	if (event.url.pathname.startsWith('/my/')) {
		if (!pb.authStore.isValid) {
			return new Response(null, {
				status: 303,
				headers: {
					location: '/auth/login'
				}
			});
		}
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
