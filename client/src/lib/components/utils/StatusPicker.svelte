<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from '$lib/stores/toast';
	import { clickoutside } from '@svelte-put/clickoutside';
	import Badge from './Badge.svelte';

	export let selectedStatus: string;
	export let statusOptions: any;
	export let statusTextOptions: any;
	export let statusColors: any;
	export let submitEndpoint: string | null;
	export let attributeName: string;

	let statusPickerDropdown: HTMLDivElement;
	let loading: boolean = false;
	let form: HTMLFormElement;
	let statusInput: HTMLInputElement;
	let dropdownToggled: boolean = false;

	const toggleStatusPickerDropdown = () => {
		dropdownToggled = !dropdownToggled;
		statusPickerDropdown.classList.toggle('hidden');
		statusPickerDropdown.classList.toggle('block');
	};

	const updateStatus = (status: unknown) => {
		selectedStatus = status as string;
		statusInput.value = selectedStatus;

		form.requestSubmit();
		toggleStatusPickerDropdown();
	};

	const submitStatusUpdate = () => {
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

	$: selectedStatus, loading, dropdownToggled;
</script>

{#if submitEndpoint}
	<form
		action={submitEndpoint}
		method="POST"
		enctype="multipart/form-data"
		use:enhance={submitStatusUpdate}
		bind:this={form}
	>
		<input bind:this={statusInput} type="hidden" name={attributeName} value={selectedStatus} />
	</form>
{/if}

{#key selectedStatus}
	<div
		class="relative"
		use:clickoutside={{ enabled: dropdownToggled }}
		on:clickoutside={toggleStatusPickerDropdown}
	>
		<button type="button" on:click={toggleStatusPickerDropdown}>
			<Badge
				text={statusTextOptions[`${selectedStatus}`]}
				colorScheme={statusColors[`${selectedStatus}`]}
			/>
		</button>

		<div
			bind:this={statusPickerDropdown}
			class="absolute z-10 mt-2 hidden w-40 origin-top-right space-y-4 rounded-lg bg-[#fff] p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="status-picker-dropdown"
			tabindex="-1"
		>
			{#each Object.values(statusOptions) as statusOption}
				<button class="block w-full" type="button" on:click={() => updateStatus(statusOption)}>
					<Badge
						text={statusTextOptions[`${statusOption}`]}
						colorScheme={statusColors[`${statusOption}`]}
					/>
				</button>
			{/each}
		</div>
	</div>
{/key}
