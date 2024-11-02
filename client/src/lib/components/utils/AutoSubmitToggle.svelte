<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import { toast } from "$lib/stores/toast";
  import Toggle from "./Toggle.svelte";
  
  export let submitEndpoint: string;
	export let attributeName: string;
	export let attributeValue: boolean | undefined;

  let form: HTMLFormElement | null = null;

  const submitUpdateValue = () => {
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
		};
	};

	$: attributeValue
</script>

<form
  action={submitEndpoint}
  method="POST"
  class="flex items-center"
  enctype="multipart/form-data"
  use:enhance={submitUpdateValue}
  bind:this={form}
>
	{#key attributeValue}
		<input type="hidden" name="{attributeName}" value={attributeValue} />
	{/key}

  <Toggle bind:toggled={attributeValue} on:change={() => form?.requestSubmit()} />
</form>