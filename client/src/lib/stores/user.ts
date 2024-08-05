import type { AuthModel, AdminModel } from 'pocketbase';
import { writable } from 'svelte/store';

export const currentUser = writable<AuthModel | AdminModel | null>();
