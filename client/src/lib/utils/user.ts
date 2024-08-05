export const generateUsername = (email: string): string => {
	const emailHandle = email.split('@')[0].toLowerCase();
	const randomDigits = Math.floor(1000 + Math.random() * 9000);
	const username = `${emailHandle}${randomDigits}`;

	return username;
};
