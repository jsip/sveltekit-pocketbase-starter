<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import Icon from '@iconify/svelte';
	import { getImageURL } from '$lib/utils/utils';
	import { currentUser } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { avatarNavLinks, headerNavLinks } from '$lib/utils/nav';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { clickoutside } from "@svelte-put/clickoutside";
	import DarkMode from './DarkMode.svelte';

	let mobileMenu: HTMLDivElement;
	let avatarDropdown: HTMLDivElement;
	let avatarDropdownOpen: boolean = false;
	let parent: HTMLElement | null;

	const handleLogout = () => {
		pb.authStore.clear();
		goto('/');
	};

	const toggleMobileMenu = () => {
		mobileMenu.classList.toggle('hidden');
	}

	const toggleAvatarDropdown = () => {
		avatarDropdown.classList.toggle('hidden');
		avatarDropdownOpen = !avatarDropdownOpen;
	}

	onMount(() => {
		if (browser) {
			parent = document.querySelector("body")!;
		}
	});

	$: parent, avatarDropdownOpen;
</script>

<header class="flex h-16 w-full">
	{#if $currentUser}
		<div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<div class="flex flex-1 items-center gap-x-6">
				<button type="button" class="md:hidden" on:click={toggleMobileMenu}>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-5 w-5 text-gray-900"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				<img
					class="h-8 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
			</div>

			<nav
				class="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700"
			>
				{#each headerNavLinks as link}
					<a href={link.href} aria-label={link.name} class="text-nowrap">
						<div class="flex items-center gap-2 font-bold">
							<Icon icon={link.icon} class="h-5 w-5" />
							<div>{link.name}</div>
						</div>
					</a>
				{/each}
			</nav>

			<div class="flex flex-1 items-center justify-end gap-x-2">
				<button type="button" class="p-2.5 text-gray-400 hover:text-gray-500">
					<span class="sr-only">View notifications</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</button>

				<div class="relative flex-shrink-0">
					<div>
						{#key parent}
							{#if parent}
								<button
									on:click={() => toggleAvatarDropdown()}
									use:clickoutside={{ limit: { parent }, enabled: avatarDropdownOpen }}
									on:clickoutside={toggleAvatarDropdown}
									type="button"
									class="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
									id="user-menu-button"
									aria-expanded="false"
									aria-haspopup="true"
								>
									<span class="absolute -inset-1.5" />
									<img
										class="h-6 w-6 rounded-full"
										src={$currentUser?.avatar
											? getImageURL($currentUser?.collectionId, $currentUser?.id, $currentUser?.avatar)
											: `https://ui-avatars.com/api/?name=${$currentUser?.username}`}
										alt="User avatar"
									/>
								</button>
							{/if}
						{/key}
					</div>

					<div
						bind:this={avatarDropdown}
						class="hidden show-dropdown absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="user-menu-button"
						tabindex="-1"
					>
						{#each avatarNavLinks as link}
							<a
								href={link.href}
								aria-label={link.name}
								class="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 group"
								on:click={toggleAvatarDropdown}
							>
								<div class="flex items-center gap-2 font-bold">
									<Icon icon={link.icon} class="h-5 w-5 transition-all will-change-transform duration-300 group-hover:translate-x-1" />
									<div>{link.name}</div>
								</div>
							</a>
						{/each}
						
						<form
							class="flex w-fit"
							method="POST"
							action="/auth/logout"
							on:submit={handleLogout}
							aria-label="Logout"
						>
							<button class="btn group/logoutButton w-full block rounded-lg px-3 py-2 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50" aria-label="Logout">
								<div class="flex items-center gap-2 font-bold">
									<Icon
										icon="mdi-logout"
										class="h-5 w-5 transition-all will-change-transform duration-300 md:group-hover/logoutButton:translate-x-1"
									/>
									<div class="">Logout</div>
								</div>
							</button>
						</form>

						<div class="m-2">
							<DarkMode />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu open state. -->
		<div class="hidden lg:hidden" role="dialog" aria-modal="true" bind:this={mobileMenu}>
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-50"></div>
			<div
				class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="-ml-0.5 flex h-16 items-center gap-x-6">
					<button type="button" class="-m-2.5 p-2.5 text-gray-700" on:click={toggleMobileMenu}>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					<div class="-ml-0.5">
						<a href="/" class="-m-1.5 block p-1.5">
							<span class="sr-only">Your Company</span>
							<img
								class="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</a>
					</div>
				</div>

				<div class="mt-2 space-y-2">
					{#each headerNavLinks as link}
						<a
							href={link.href}
							aria-label={link.name}
							class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							on:click={toggleMobileMenu}
						>
							<div class="flex items-center gap-2 font-bold">
								<Icon icon={link.icon} class="h-5 w-5" />
								<div>{link.name}</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<a href="/">
				<img
					class="h-8 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
			</a>
			<div class="flex w-full justify-end space-x-4 text-sm">
				<div class="flex items-center gap-2 font-bold">
					<a
						href="/auth/login"
						class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
						aria-label="Log in">Log in</a
					>
				</div>
				<div class="flex items-center gap-2 font-bold">
					<a
						href="/auth/register"
						class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
						aria-label="Register">Register</a
					>
				</div>
			</div>
		</div>
	{/if}
</header>
