import { writable } from 'svelte/store';

export const toast = writable({
	show: false,
	message: '',
	type: ''
} as {
	show: boolean;
	message: string;
	type: 'success' | 'error' | undefined | '';
});
