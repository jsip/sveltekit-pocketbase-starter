<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="py-8 pb-4">
	<div class="mx-auto px-3 sm:px-4">
		<h1 class="text-lg font-semibold dark:text-gray-50">Dashboard</h1>
		<div class="pt-4 sm:pt-12"></div>

		<div class="space-y-16 py-16 xl:space-y-20">
			<div class="mx-auto">
				<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
					<div class="flex items-center justify-between">
					</div>
					<ul
						role="list"
						class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
					></ul>
				</div>
			</div>
		</div>
	</div>
</main>
