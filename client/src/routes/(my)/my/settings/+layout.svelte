<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	const navigation = [
		{
			title: 'Profile',
			href: '/my/settings/profile',
			icon: 'mdi-user'
		},
		{
			title: 'Account',
			href: '/my/settings/account',
			icon: 'mdi-card-account-details'
		},
		{
			title: 'Security',
			href: '/my/settings/security',
			icon: 'mdi-lock'
		}
	];
</script>

<div class="mx-auto max-w-7xl px-4 pt-4 lg:flex lg:gap-x-16">
	<aside
		class="flex flex-col border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0"
	>
		<h1 class="mb-8 text-lg font-semibold dark:text-gray-50">Settings</h1>
		<nav class="flex-none overflow-x-auto px-4 sm:px-6 lg:px-0">
			<ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
				{#each navigation as navItem}
					<li>
						<a
							href={navItem.href}
							class="group flex items-center gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-tertiary/20 dark:hover:bg-tertiary/5 hover:text-primary dark:text-white {$page
								.url.pathname === navItem.href
								? 'active bg-tertiary/20 dark:bg-tertiary/5 text-primary dark:text-white'
								: ''}"
						>
							<Icon
								icon={navItem.icon}
								class="h-5 w-5 shrink-0 text-gray-400 group-hover:text-primary dark:text-white"
							/>
							{navItem.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-8 lg:py-20">
		<div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
			<slot />
		</div>
	</main>
</div>
