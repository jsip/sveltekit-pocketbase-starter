import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const navLinks = [
	{
		name: 'Home',
		href: '/',
		icon: 'material-symbols:home',
		new: false
	},
	{
		name: 'Account',
		href: '/my/settings/account',
		icon: 'mdi-gear',
		new: false
	},
	{
		name: 'Profile',
		href: '/my/settings/profile',
		icon: 'mdi-user',
		new: false
	},
	{
		name: 'Security',
		href: '/my/settings/security',
		icon: 'mdi-lock',
		new: false
	},
	{
		name: 'PB Admin',
		href: `${PUBLIC_POCKETBASE_URL}/_/`,
		icon: 'simple-icons:pocketbase',
		new: false
	}
];
