import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const createInstance = () => {
	return new PocketBase(PUBLIC_POCKETBASE_URL || 'http://localhost:8090');
};

export const pb = createInstance();
