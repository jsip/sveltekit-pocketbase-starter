<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	export let form;
	import Icon from '@iconify/svelte';

	let loading = false;
</script>

<form
	action="?/reset"
	method="POST"
	class="card mx-auto max-w-sm transition-all duration-300 ease-in-out sm:mt-10"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				loading = true;
				await applyAction(result);
			} else {
				await applyAction(result);
			}
		};
	}}
>
	<div class="mb-2">
		<h1 class="text-7xl">reset password</h1>

		<p class="pt-2">Request a password reset link to be e-mailed to you.</p>
	</div>
	<div class="form-control mb-4 gap-0">
		<input type="email" name="email" class="input input-bordered w-full" placeholder="Email" />
	</div>
	<div class="w-full">
		<button type="submit" class="btn btn-primary group/loginButton w-full">
			{#if loading}
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				request password reset <Icon
					icon="mdi-lock-reset"
					class="h-5 w-5 transition-all duration-300 md:group-hover/loginButton:translate-x-1"
				/>
			{/if}
		</button>
	</div>

	{#if form?.success}
		<div class="alert alert-success my-5">
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 flex-shrink-0 animate-pulse stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>An email has been sent to reset your password!</span>
			</div>
		</div>
	{/if}
</form>
