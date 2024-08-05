import type PocketBase from 'pocketbase';
import { pb as pbLib } from '$lib/pocketbase';
import type { RecordAuthResponse } from 'pocketbase';
import type { UsersResponse } from '$lib/types/pocketbase-types';

export class API {
	pb;
	constructor(pb?: PocketBase) {
		if (pb) {
			this.pb = pb;
		} else {
			this.pb = pbLib;
		}
	}

	/**
	 * Checks if an AuthStore is present
	 * @returns True if the AuthStore is present/valid, false otherwise.
	 */
	isAuthValid(): boolean {
		return this.pb.authStore.model !== null && this.pb.authStore.isValid;
	}

	/**
	 * Creates a user.
	 * @param username The username of the user.
	 * @param email The email of the user.
	 * @param password The password of the user.
	 * @param passwordConfirm The password confirmation of the user.
	 * @returns The created user as a pocketbase model.
	 */
	async createUser(
		username: string,
		email: string,
		password: string,
		passwordConfirm: string
	): Promise<UsersResponse> {
		const user = {
			username,
			email,
			password,
			passwordConfirm
		};

		const userRecord: UsersResponse = await this.pb.collection('users').create(user);

		return userRecord;
	}

	/**
	 * Validates a user's email address.
	 * @param email The email of the user.
	 * @returns True if the email validation was successful, false otherwise.
	 */
	async validateUserEmail(email: string): Promise<boolean> {
		return await this.pb.collection('users').requestVerification(email);
	}

	/**
	 * Logs a user in.
	 * @param email The email of the user.
	 * @param password The password of the user.
	 * @returns The logged in user as a pocketbase model.
	 */
	async login(email: string, password: string): Promise<RecordAuthResponse> {
		return await this.pb.collection('users').authWithPassword(email, password);
	}

	/**
	 * Requests a password reset.
	 * @param email The email of the user.
	 * @returns True if the password reset request was successful, false otherwise.
	 */
	async requestPasswordReset(email: string): Promise<boolean> {
		return await this.pb.collection('users').requestPasswordReset(email);
	}

	/**
	 * Requests a user's email change.
	 * @param email The email of the user.
	 * @returns True if the email change request was successful, false otherwise.
	 */
	async requestEmailChange(email: string): Promise<boolean> {
		return await this.pb.collection('users').requestEmailChange(email);
	}

	/**
	 * Checks if a username is available.
	 * @param username The username to check.
	 * @returns True if the username is available, false otherwise.
	 */
	async isUsernameAvailable(username: string): Promise<boolean> {
		try {
			await this.pb.collection('users').getFirstListItem(`username = "${username}"`);
			return false;
		} catch (err: any) {
			if (err.status === 404) {
				return true;
			}
			throw err;
		}
	}

	/**
	 * Updates a user's username.
	 * @param userId The ID of the user.
	 * @param username The new username of the user.
	 * @returns The updated user as a pocketbase model.
	 */
	async updateUsername(userId: string, username: string): Promise<UsersResponse> {
		return await this.pb.collection('users').update(userId, { username });
	}

	/**
	 * Updates a user
	 * @param userId The ID of the user.
	 * @param data The data to update.
	 * @returns The updated user as a pocketbase model.
	 */
	async updateUser(userId: string, data: Record<string, any>): Promise<UsersResponse> {
		return await this.pb.collection('users').update(userId, data);
	}
}
