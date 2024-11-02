<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	export let showModal: boolean = false;

	let dialog: HTMLDialogElement;

	const disableScroll = () => {
		if (browser) {
			document.body.classList.add('no-scroll');
		}
	};

	const enableScroll = () => {
		if (browser) {
			document.body.classList.remove('no-scroll');
		}
	};

	$: if (dialog && showModal && browser) {
		dialog.showModal();
		disableScroll();
	}

	onMount(() => {
		if (showModal) {
			disableScroll();
		}
	});

	onDestroy(() => {
		if (browser) {
			enableScroll();
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	id="modal"
	class="mx-auto w-full max-w-7xl rounded-lg border-none p-2"
	bind:this={dialog}
	on:close={() => {
		showModal = false;
		enableScroll();
	}}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}

	:global(body.no-scroll) {
		overflow: hidden;
	}
</style>
