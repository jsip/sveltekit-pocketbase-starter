<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from '$lib/stores/toast';
	import type { HTMLString } from '$lib/types/pocketbase-types';
	import { clickoutside } from '@svelte-put/clickoutside';
	import { onMount } from 'svelte';
	import Input from './Input.svelte';
	import Icon from '@iconify/svelte';

	export let submitEndpoint: string;
	export let attributeName: string;
	export let attributeValue: HTMLString | any;
	export let type: string = 'text';
	export let toggleEditType: 'button' | 'click' = 'button';
	export let emptyValueText: string = `Add a ${attributeName}`;

	let editMode: boolean = false;
	let form: HTMLFormElement | null = null;
	let loading: boolean = false;
	let debounceTimer: ReturnType<typeof setTimeout>;
	let parent: HTMLElement;
	let errors: string[] = [];

	const submitUpdateValue = () => {
		loading = true;
		return async ({ result }: any) => {
			switch (result.type) {
				case 'success':
					toast.set({
						show: true,
						message: `${attributeName} updated successfully`,
						type: 'success'
					});
					setTimeout(() => toast.set({ show: false, message: '', type: '' }), 2000);
					await invalidateAll();
					break;
				case 'error':
					toast.set({
						show: true,
						message: `${attributeName} update failed`,
						type: 'error'
					});
					setTimeout(() => toast.set({ show: false, message: '', type: '' }), 2000);
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

	const debouncedSubmit = () => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			if (form) {
				form.requestSubmit();
			}
		}, 100);
	};

	onMount(() => {
		parent = document.querySelector('body')!;

		return () => {
			clearTimeout(debounceTimer);
		};
	});

	const toggleEditMode = (value: boolean) => {
		if (!value && form) form.requestSubmit();

		setTimeout(() => {
			editMode = value;
		}, 10);
	};

	$: editMode, attributeValue, loading;
</script>

{#if toggleEditType === 'button'}
	{#if editMode}
		<form
			action={submitEndpoint}
			method="POST"
			class="flex w-full flex-col space-y-2"
			enctype="multipart/form-data"
			use:enhance={submitUpdateValue}
			bind:this={form}
			use:clickoutside={{ limit: { parent }, enabled: editMode }}
			on:clickoutside={() => toggleEditMode(false)}
		>
			<Input
				id={attributeName}
				bind:value={attributeValue}
				{errors}
				{type}
				on:change={debouncedSubmit}
			/>
		</form>
	{:else}
		<div class="flex w-full items-center">
			<slot />
			<button type="button" class="inline-flex align-middle" on:click={() => toggleEditMode(true)}>
				{#if attributeValue}
					<Icon icon="mdi-pencil" class="ml-2 h-4 w-4 text-gray-400" />
				{:else}
					<span class="text-sm font-medium leading-6 text-gray-900 text-nowrap">
						{emptyValueText}
					</span>
				{/if}
			</button>
		</div>
	{/if}
{:else if editMode}
	<form
		action={submitEndpoint}
		method="POST"
		class="flex w-full flex-col space-y-2"
		enctype="multipart/form-data"
		use:enhance={submitUpdateValue}
		bind:this={form}
		use:clickoutside={{ limit: { parent }, enabled: editMode }}
		on:clickoutside={() => toggleEditMode(false)}
	>
		<Input
			id={attributeName}
			bind:value={attributeValue}
			{errors}
			{type}
			on:change={debouncedSubmit}
		/>
	</form>
{:else}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={() => toggleEditMode(true)}>
		<slot />
	</div>
{/if}
