<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fade, slide } from 'svelte/transition';
	export let message = 'Toast Message';
	export let type = 'success';
	export let x = 'center';
	export let y = 'top';
	export let show = false;
</script>

{#if show}
	<div
		in:slide={{ duration: 300 }}
		out:fade={{ duration: 300 }}
		class={`toast z-50 mt-16 toast-${x} toast-${y}`}
	>
		<div class={`border shadow-lg border-${type}-content alert alert-${type}`}>
			<div class={`flex items-center gap-2 text-${type}-content`}>
				<div>
					<Icon icon="carbon:notification" class="h-5 w-5" />
				</div>
				<div>{message}</div>
			</div>
		</div>
	</div>
{/if}
