<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import type { LayoutServerData } from './$types';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { onNavigate } from '$app/navigation';
	import Toast from '$lib/components/utils/Toast.svelte';
	import { toast } from '$lib/stores/toast';
	import Icon from '@iconify/svelte';
	import { headerNavLinks } from '$lib/utils/nav';
	import { page } from '$app/stores';
	import { getImageURL } from '$lib/utils/utils';
	import { clickoutside } from '@svelte-put/clickoutside';
	import DarkMode from '$lib/components/singular/DarkMode.svelte';

	export let data: LayoutServerData;

	let currentPageTitle = '';
	let searchQuery = '';
	let searchResults: any;
	let searchedDebounced: boolean = false;

	// Set current user and page title
	$: currentUser.set(data.user);
	$: currentPageTitle = getCurrentPageTitle($page.url.pathname);

	const getCurrentPageTitle = (pathname: string): string => {
		const segment = pathname?.split('/')?.pop();
		return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : '';
	};

	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		if (isMobileSidebarOpen) {
			toggleSidebar(false);
		}

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const handleLogout = () => {
		pb.authStore.clear();
		goto('/');
	};

	let isMobileSidebarOpen = false;
	let isDesktopSidebarOpen = true;

	const toggleSidebar = (open: boolean) => {
		isMobileSidebarOpen = open;
		isDesktopSidebarOpen = open;
	};

	$: isDesktopSidebarOpen, isMobileSidebarOpen, searchQuery;

	const searchTransactions = async () => {
		if (!searchQuery || searchQuery == '') {
			searchResults = [];
			return;
		}

		if (searchedDebounced) {
			return;
		}

		if (searchQuery.length < 3) {
			return;
		}

		searchedDebounced = true;

		setTimeout(() => {
			searchedDebounced = false;
		}, 500);

		const req = await fetch('/my/home?/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({ query: searchQuery }).toString()
		});

		const res = await req.json();

		const data = JSON.parse(res.data);
		searchResults = JSON.parse(data);
	};
</script>

<svelte:head>
	<title>Starter - {currentPageTitle}</title>
</svelte:head>

<div>
	<Toast {...$toast} />

	<!-- Off-canvas menu for mobile -->
	<div
		class={`fixed inset-0 z-50 transition-opacity duration-300 ${
			isMobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
		} lg:hidden`}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="fixed inset-0 bg-gray-900/5"
			aria-hidden="true"
			on:click={() => toggleSidebar(false)}
		></div>

		<div
			class={`fixed inset-0 flex transform transition-transform duration-300 ${
				isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<div class="relative mr-16 flex w-full max-w-xs flex-1">
				<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
					<button type="button" on:click={() => toggleSidebar(false)} class="fixed inset-0 z-10">
						<span class="sr-only">Close sidebar</span>
					</button>
				</div>

				<!-- Sidebar content -->
				<div
					class="z-20 m-8 mt-16 flex grow flex-col gap-y-5 overflow-y-auto rounded-xl bg-white px-6 pb-4 dark:bg-zinc-900"
				>
					<div class="flex h-16 shrink-0 items-center">
						<img class="h-8 w-auto dark:hidden" src="/logo.png" alt="Starter" />
						<img class="hidden h-8 w-auto dark:block" src="/logo.png" alt="Starter" />
					</div>
					<nav class="flex flex-1 flex-col">
						<ul role="list" class="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" class="-mx-2 space-y-1">
									{#each headerNavLinks as navItem}
										<li>
											<a
												href={navItem.href}
												class="group block w-full rounded-lg p-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
												aria-label="Navigation link"
											>
												<div class="flex items-center gap-2 font-semibold">
													<Icon
														icon={navItem.icon}
														class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
													/>
													<div>{navItem.name}</div>
												</div>
											</a>
										</li>
									{/each}
								</ul>
							</li>
							<li>
								<div class="text-xs font-semibold text-gray-400">List title</div>
								<ul role="list" class="mt-2 space-y-1"></ul>
							</li>
							<li class="mt-auto">
								<a
									href="/my/settings"
									class="group block w-full rounded-lg py-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
									aria-label="Settings"
								>
									<div class="flex items-center gap-2 font-semibold">
										<Icon
											icon="mdi-settings"
											class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
										/>
										<div>Settings</div>
									</div>
								</a>

								<div class="flex w-full justify-between">
									<form
										class="flex w-full flex-1"
										method="POST"
										action="/auth/logout"
										on:submit={handleLogout}
										aria-label="Logout"
									>
										<button
											class="group block w-full rounded-lg py-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
											aria-label="Logout"
										>
											<div class="flex items-center gap-2 font-semibold">
												<Icon
													icon="mdi-logout"
													class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
												/>
												<div>Logout</div>
											</div>
										</button>
									</form>

									<DarkMode />
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div
		class="relative hidden transform transition-transform duration-300 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col {isDesktopSidebarOpen
			? ''
			: '-translate-x-full'}"
	>
		<button
			type="button"
			class="absolute {isDesktopSidebarOpen ? '-right-4' : '-right-10'} group top-16"
			on:click={() => toggleSidebar(!isDesktopSidebarOpen)}
		>
			<Icon
				icon="mdi-swap-horizontal"
				class="h-8 w-8 rounded-full border-2 border-gray-50 bg-white p-1 text-primary shadow transition-transform will-change-transform group-hover:-translate-x-2 dark:border-slate-700 dark:bg-gray-900 dark:text-white"
			/>
		</button>

		<div
			class="m-4 mr-0 flex grow flex-col gap-y-5 overflow-y-auto rounded-xl border border-gray-50 px-6 pb-4 shadow dark:border-slate-700 dark:shadow-slate-700"
		>
			<div class="flex h-16 shrink-0 items-center">
				<img class="h-8 w-auto dark:hidden" src="/logo.png" alt="Starter" />
				<img class="hidden h-8 w-auto dark:block" src="/logo.png" alt="Starter" />
			</div>
			<nav class="flex flex-1 flex-col">
				<ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" class="-mx-2 space-y-1">
							{#each headerNavLinks as navItem}
								<li>
									<a
										href={navItem.href}
										class="group block w-full rounded-lg p-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
										aria-label="Navigation link"
									>
										<div class="flex items-center gap-2 font-semibold">
											<Icon
												icon={navItem.icon}
												class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
											/>
											<div>{navItem.name}</div>
										</div>
									</a>
								</li>
							{/each}
						</ul>
					</li>
					<li>
						<div class="text-xs font-semibold text-gray-400">List title</div>
						<ul role="list" class="mt-2 space-y-1"></ul>
					</li>
					<li class="mt-auto">
						<a
							href="/my/settings"
							class="group block w-full rounded-lg py-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
							aria-label="Settings"
						>
							<div class="flex items-center gap-2 font-semibold">
								<Icon
									icon="mdi-settings"
									class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
								/>
								<div>Settings</div>
							</div>
						</a>

						<div class="flex w-full justify-between">
							<form
								class="flex w-full flex-1"
								method="POST"
								action="/auth/logout"
								on:submit={handleLogout}
								aria-label="Logout"
							>
								<button
									class="group block w-full rounded-lg py-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
									aria-label="Logout"
								>
									<div class="flex items-center gap-2 font-semibold">
										<Icon
											icon="mdi-logout"
											class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
										/>
										<div>Logout</div>
									</div>
								</button>
							</form>

							<DarkMode />
						</div>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div class={isDesktopSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'}>
		<div class="sticky top-0 z-40 flex h-16 shrink-0 items-center px-8">
			<button
				type="button"
				on:click={() => toggleSidebar(true)}
				class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>

			<div class="relative flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
				<form
					class="relative ml-4 flex flex-1 rounded-lg border border-gray-200 px-4 py-2 md:p-4 dark:border-slate-700 dark:shadow-slate-700"
					action="#"
					method="GET"
				>
					<label for="search-field" class="sr-only">Search</label>
					<svg
						class="pointer-events-none absolute inset-y-0 left-0 mx-4 h-full w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							fill-rule="evenodd"
							d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input
						id="search-field"
						class="ml-4 block h-full w-full border-0 py-0 pr-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-white dark:bg-zinc-900 dark:text-gray-50"
						placeholder="Search..."
						type="search"
						name="query"
						bind:value={searchQuery}
						on:input={searchTransactions}
					/>

					{#key searchResults}
						{#if searchResults?.length > 0}
							<table
								id="search-results"
								class="absolute inset-x-0 top-16 flex max-h-[30rem] w-full flex-col overflow-y-scroll rounded-xl border-2 border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
								use:clickoutside={{ enabled: searchResults.length > 0 }}
								on:clickoutside={() =>
									document.getElementById('search-results')?.classList.add('hidden')}
							>
								<tbody>
									{#each searchResults as result}{/each}
								</tbody>
							</table>
						{/if}
					{/key}
				</form>

				<img
					class="h-8 w-8 rounded-full"
					src={$currentUser?.avatar
						? getImageURL($currentUser?.collectionId, $currentUser?.id, $currentUser?.avatar)
						: `https://ui-avatars.com/api/?name=${$currentUser?.username}`}
					alt="User avatar"
				/>
			</div>
		</div>

		<main class="sm:px-4 md:px-6 lg:px-8">
			<slot />
		</main>
	</div>
</div>
