<script lang="ts">
	import Input from '$lib/components/utils/Input.svelte';
	export let form;
</script>

<div class="flex h-full w-full flex-col">
	<div class="w-full">
		<form action="?/updatePassword" method="POST" class="flex w-full flex-col space-y-2">
			<h1 class="text-lg font-semibold leading-6 text-gray-900">Update Password</h1>
			<a href="/auth/reset" class="text-primary hover:cursor-point text-sm hover:underline">
				I forgot my password</a
			>
			<div class="divider" />
			<Input
				id="oldPassword"
				type="password"
				required
				errors={form?.errors?.oldPassword}
				placeholder="Current Password"
			/>
			<Input
				id="password"
				type="password"
				required
				errors={form?.errors?.password}
				placeholder="New Password"
			/>
			<Input
				id="passwordConfirm"
				type="password"
				required
				errors={form?.errors?.passwordConfirm}
				placeholder="Confirm Password"
			/>
			<div class="w-full max-w-lg pt-2">
				<button type="submit" class="btn btn-primary w-full max-w-lg"> Update Password </button>
			</div>
		</form>
	</div>
</div>
