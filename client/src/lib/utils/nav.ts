import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const headerNavLinks = [
	{
		name: 'Home',
		href: '/my/home',
		icon: 'material-symbols:home'
	},
	{
		name: 'Settings',
		href: '/my/settings/profile',
		icon: 'mdi-gear'
	},
	{
		name: 'PB Admin',
		href: `${PUBLIC_POCKETBASE_URL}/_/`,
		icon: 'simple-icons:pocketbase'
	}
];

export const avatarNavLinks = [
	{
		name: 'Profile',
		href: '/my/settings/profile',
		icon: 'mdi-user'
	},
	{
		name: 'Account',
		href: '/my/settings/account',
		icon: 'mdi-card-account-details'
	},
	{
		name: 'Security',
		href: '/my/settings/security',
		icon: 'mdi-lock'
	}
];
