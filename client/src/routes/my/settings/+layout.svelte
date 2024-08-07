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

<div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
	<aside
		class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
	>
		<nav class="flex-none px-4 sm:px-6 lg:px-0">
			<ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
				{#each navigation as navItem}
					<li>
						<a
							href={navItem.href}
							class="group flex gap-x-3 items-center rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary {$page
								.url.pathname === navItem.href
								? 'active bg-gray-50 text-primary'
								: ''}"
						>
							<Icon
								icon={navItem.icon}
								class="h-5 w-5 shrink-0 text-gray-400 group-hover:text-primary"
							/>
							{navItem.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
		<div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
			<slot />
		</div>
	</main>
</div>
