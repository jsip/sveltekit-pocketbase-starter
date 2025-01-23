<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let toggled: boolean = false;

	const dispatch = createEventDispatcher();

	$: toggled;

	$: console.log(toggled);
</script>

<label class="inline-flex cursor-pointer items-center">
	<input
		type="checkbox"
		bind:value={toggled}
		on:change={() => dispatch('change')}
		class="peer sr-only"
		bind:checked={toggled}
	/>
	<div
		class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"
	></div>
</label>
