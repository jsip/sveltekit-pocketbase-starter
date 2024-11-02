<script lang="ts">
	import '../app.css';
	import { currentUser } from '$lib/stores/user';
	import type { PageData } from './$types';
	import Nav from '$lib/components/singular/Nav.svelte';
	import Footer from '$lib/components/singular/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Toast from '$lib/components/utils/Toast.svelte';
	import { toast } from '$lib/stores/toast';

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

<div class="h-full min-h-screen bg-white dark:bg-gray-900">
	<Toast {...$toast} />

	<div class="bg-base-100 sticky top-0 z-50">
		<div class="md:flex">
			<Nav />
		</div>
	</div>

	<div class="max-w-screen mx-auto">
		<slot />
	</div>

	<Footer />
</div>
