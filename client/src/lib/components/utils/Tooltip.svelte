<script lang="ts">
	import Icon from '@iconify/svelte';
	import { clickoutside } from '@svelte-put/clickoutside';

	export let text: string;
	export let icon: string = 'mdi-information';
	export let position: 'top' | 'right' | 'bottom' | 'left' = 'right';

	let tooltip: HTMLDivElement;
	let tooltipToggled: boolean = false;

	const toggleTooltip = () => {
		tooltipToggled = !tooltipToggled;
		tooltip.classList.toggle('hidden');
	};

	$: tooltipToggled;
	$: tooltipClasses = {
		base: 'hidden group-hover:block absolute z-10 w-max p-2 bg-[#fff] rounded-lg shadow-lg',
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		right: 'top-1/2 -translate-y-1/2 left-full ml-2',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'top-1/2 -translate-y-1/2 right-full mr-2'
	};

	$: arrowClasses = {
		base: "before:content-[''] before:absolute before:border-8 before:border-transparent",
		top: 'before:top-full before:left-1/2 before:-translate-x-1/2 before:border-t-[#fff]',
		right: 'before:right-full before:top-1/2 before:-translate-y-1/2 before:border-r-[#fff]',
		bottom: 'before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-b-[#fff]',
		left: 'before:left-full before:top-1/2 before:-translate-y-1/2 before:border-l-[#fff]'
	};
</script>

<div
	class="group relative flex"
	use:clickoutside={{ enabled: tooltipToggled }}
	on:clickoutside={toggleTooltip}
>
	<button type="button" class="hover:cursor-pointer" on:click={toggleTooltip}>
		{#if $$slots.trigger}
			<slot name="trigger" />
		{:else}
			<Icon {icon} class="h-5 w-5" />
		{/if}
	</button>

	<div
		bind:this={tooltip}
		class={`${tooltipClasses.base} ${tooltipClasses[position]} ${arrowClasses.base} ${arrowClasses[position]}`}
	>
		<span class="block text-sm font-semibold">{text}</span>
	</div>
</div>
