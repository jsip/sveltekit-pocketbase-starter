<script lang="ts">
	import '../app.css';
	import { currentUser } from '$lib/stores/user';
	import type { PageData } from './$types';
	import Nav from '$lib/components/singular/Nav.svelte';
	import Footer from '$lib/components/singular/Footer.svelte';
	import { onNavigate } from '$app/navigation';

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

	$: currentUser.set(data.user);
</script>

<div class="h-full min-h-screen">
	<div class="bg-base-100 text-neutral-content sticky top-0 z-50 shadow">
		<div class="md:flex">
			<Nav {data} />
		</div>
	</div>

	<div class="mx-auto w-full max-w-2xl p-2">
		<slot />
	</div>

	<Footer />
</div>
