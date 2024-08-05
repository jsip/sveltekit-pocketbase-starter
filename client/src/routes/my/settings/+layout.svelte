<script lang="ts">
	import { page } from '$app/stores';

	const navigation = [
		{
			title: 'Profile',
			href: '/my/settings/profile'
		},
		{
			title: 'Account',
			href: '/my/settings/account'
		},
		{
			title: 'Security',
			href: '/my/settings/security'
		}
	];
</script>

<div class="h-full w-full">
	<div class="text-7xl">Settings</div>
	<div class="divider" />
</div>

<div class="flex h-full w-full">
	<ul class="menu bg-base-100 rounded-box h-full w-40 gap-2">
		{#each navigation as navItem}
			<li>
				<a
					href={navItem.href}
					class="text-lg {$page.url.pathname === navItem.href ? 'active hover:bg-neutral' : ''}"
					>{navItem.title}</a
				>
			</li>
		{/each}
	</ul>
	<div class="w-full max-w-lg px-2">
		<slot />
	</div>
</div>
