<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import { fade, slide } from 'svelte/transition';

	export let message = 'Toast Message';
	export let type: 'success' | 'error' | undefined | "" = 'success';
	export let x = 'center';
	export let y = 'top';
	export let show = false;

	const dismiss = () => {
		toast.set({ show: false, message: '', type: '' });
	};

	$: show, message, type, x, y;
	$: {
		if (show) {
			setTimeout(() => {
				toast.set({ show: false, message: '', type: '' });
			}, 3000);
		}
	}
</script>

{#if show}
	<div aria-live="assertive" class="pointer-events-none fixed inset-x-0 bottom-6 mb-12">
		<div class="flex w-full flex-col items-center z-50 absolute">
			<div
				class="animate-new pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5"
				in:slide={{ duration: 300 }}
				out:fade={{ duration: 300 }}
			>
				<div class="p-4">
					<div class="flex items-start">
						<div class="shrink-0">
							{#if type == 'success'}
								<svg class="size-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
									<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
								</svg>
							{:else}
								<svg class="size-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6 18 18" />
								</svg>
							{/if}
						</div>
						<div class="ml-3 w-0 flex-1 pt-0.5">
							<p class="text-sm font-medium text-gray-900">{message}</p>
						</div>
						<div class="ml-4 flex shrink-0">
							<button type="button" on:click={dismiss} class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
								<span class="sr-only">Close</span>
								<svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
									<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
