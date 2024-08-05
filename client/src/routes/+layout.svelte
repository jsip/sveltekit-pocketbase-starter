<script lang="ts">
	import '../app.css';
	import { currentUser } from '$lib/stores/user';
	import type { PageData } from './$types';
	import Nav from '$lib/components/singular/Nav.svelte';
	import Footer from '$lib/components/singular/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	export let data: PageData;
	let currentPageTitle = '';

	$: currentUser.set(data.user);
	$: currentPageTitle = getCurrentPageTitle($page.url.pathname);

	const getCurrentPageTitle = (pathname: string) => {
		const segment = pathname?.split('/')?.pop();
		return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : '';
	};
</script>

<svelte:head>
	<title>{currentPageTitle}</title>
</svelte:head>

<div class="h-full min-h-screen">
	<div class="bg-base-100 sticky top-0 z-50">
		<div class="w-[95%] md:flex">
			<Nav {data} />
		</div>
	</div>

	<div class="mx-auto w-full max-w-2xl p-2">
		<slot />
	</div>

	<Footer />
</div>
