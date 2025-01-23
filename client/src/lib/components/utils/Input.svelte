<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id: any;
	export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let errors: any;
</script>

<div>
	<div class="flex justify-between">
		<label for={id} class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">{placeholder}</label>
		{#if required}
			<span class="text-sm leading-6 text-gray-500" id="{id}-required">Required</span>
		{/if}
	</div>

	<div class="mt-0.5">
		<input
			{type}
			name={id}
			{id}
			class="{type === 'file'
				? 'file-input file-input-bordered w-full'
				: 'input input-bordered w-full'} block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
			{placeholder}
			{disabled}
			{value}
			aria-describedby="{id}-optional"
		/>
	</div>

	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
