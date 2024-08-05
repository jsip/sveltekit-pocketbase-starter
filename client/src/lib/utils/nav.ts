import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const navLinks = [
	{
		name: 'Home',
		href: '/',
		icon: 'material-symbols:home',
		new: false
	},
	{
		name: 'Profile',
		href: '/my/settings/profile',
		icon: 'mdi-user',
		new: false
	},
	{
		name: 'PB Admin',
		href: `${PUBLIC_POCKETBASE_URL}/_/`,
		icon: 'simple-icons:pocketbase',
		new: false
	}
];
