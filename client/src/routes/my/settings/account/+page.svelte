<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/utils/Input.svelte';
	import { toast } from '$lib/stores/toast';
	import Toast from '$lib/components/utils/Toast.svelte';

	export let form;
	export let data;
	let loading: any;

	$: loading = false;

	const submitUpdateEmail = () => {
		loading = true;
		return async ({ result }: any) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.set({
						show: true,
						message: 'Email updated successfully',
						type: 'success'
					});
					setTimeout(() => toast.set({ show: false, message: '', type: '' }), 2000);
					break;
				case 'error':
					await invalidateAll();
					toast.set({
						show: true,
						message: 'Email update failed',
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

	const submitUpdateUsername = () => {
		loading = true;
		return async ({ result }: any) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.set({
						show: true,
						message: 'Profile updated successfully',
						type: 'success'
					});
					setTimeout(() => toast.set({ show: false, message: '', type: '' }), 2000);
					await invalidateAll();
					break;
				case 'error':
					toast.set({
						show: true,
						message: 'Profile update failed',
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
</script>

<div class="flex h-full w-full flex-col space-y-12">
	<div class="w-full">
		<h1 class="text-2xl">Update Email</h1>
		<form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
			<Input
				id="email"
				type="email"
				required={true}
				value={form?.data?.email}
				disabled={loading}
				errors={form?.errors?.email}
				placeholder="Email"
			/>
			<button type="submit" class="btn btn-primary w-full" disabled={loading}>Save</button>
		</form>
	</div>

	<div class="w-full">
		<h1 class="text-2xl">Update Username</h1>
		<form
			action="?/updateUsername"
			method="POST"
			class="space-y-2"
			use:enhance={submitUpdateUsername}
		>
			<Input
				id="username"
				type="text"
				required={true}
				value={form?.data?.username}
				errors={form?.errors?.username}
				disabled={loading}
				placeholder="Username"
			/>
			<button type="submit" class="btn btn-primary w-full" disabled={loading}>Save</button>
		</form>
	</div>
</div>

<Toast type={$toast.type} message={$toast.message} show={$toast.show} />
