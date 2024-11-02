<script lang="ts">
	export let text: string | undefined;
	export let colorScheme: string;
</script>

<div
	class="rounded-md bg-[{colorScheme}] h-min w-fit text-nowrap px-2 py-1 text-xs font-medium text-gray-800 hover:cursor-pointer"
>
	{text}
</div>
