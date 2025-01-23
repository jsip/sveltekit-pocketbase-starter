import type { RecordIdString } from '$lib/types/pocketbase-types';
import type { ZodSchema } from 'zod';
import { validateData } from './utils';

export const validateRecord = async (
	request: Request,
	userId: RecordIdString,
	schema: ZodSchema | null
): Promise<{ formData: any; errors: any }> => {
	const body = await request.formData();
	body.set('user', userId);

	return await validateData(body, schema);
};
