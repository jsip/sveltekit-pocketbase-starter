<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Input from '$lib/components/utils/Input.svelte';
	import Icon from '@iconify/svelte';
	export let form;
	let loading = false;
</script>

<form
	action="?/register"
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
		<h1 class="text-2xl">Register</h1>
		<p class=" pt-2">
			Or <a href="/auth/login" class="text-primary underline">login</a> if you already have an account
		</p>
	</div>
	<div class="form-control mb-4 space-y-4">
		<Input
			type="email"
			id="email"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email}
			placeholder={'Email'}
		/>

		<Input
			type="password"
			id="password"
			value={form?.data?.password ?? ''}
			errors={form?.errors?.password}
			disabled={loading}
			placeholder={'Password'}
		/>

		<Input
			type="password"
			id="passwordConfirm"
			value={form?.data?.password ?? ''}
			errors={form?.errors?.password}
			disabled={loading}
			placeholder={'Confirm Password'}
		/>

		<button class="btn-primary">
			{#if loading}
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				Register <Icon
					icon="mdi-account-plus"
					class="h-5 w-5 ml-2 transition-all duration-300 md:group-hover/registerButton:translate-x-1"
				/>
			{/if}
		</button>
	</div>
</form>
