<script lang="ts">
	import { currentUser } from '$lib/stores/user';
</script>

<div>
	{#if $currentUser}
		<p>Auth</p>
	{:else}
		<p>No Auth</p>
	{/if}
</div>
