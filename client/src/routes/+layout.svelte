<script lang="ts">
	import '../app.css';
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

	let currentPageTitle = '';
	$: currentPageTitle = getCurrentPageTitle($page.url.pathname);

	const getCurrentPageTitle = (pathname: string) => {
		const segment = pathname?.split('/')?.pop();
		return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : '';
	};
</script>

<svelte:head>
	<title>Collabed - {currentPageTitle}</title>
</svelte:head>

<slot />
