import { API } from '$lib/server/client';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }: any) => {

	const api = new API(locals.pb);

	return {
		user: locals.user
	};
};
