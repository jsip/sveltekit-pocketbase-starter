<script lang="ts">
	export let showIcon: boolean = true;
	export let title: string = 'No projects';
	export let description: string = 'Get started by creating a new project.';
</script>

<div class="text-center">
	{#if showIcon}
		<svg
			class="mx-auto h-12 w-12 text-gray-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				vector-effect="non-scaling-stroke"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
			/>
		</svg>
	{/if}
	<h3 class="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
	<p class="mt-1 text-sm text-gray-500">{description}</p>
	<div class="mx-auto my-2 flex justify-center">
		<slot />
	</div>
</div>
