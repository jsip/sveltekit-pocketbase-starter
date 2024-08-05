<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { enhance, applyAction } from '$app/forms';
	import Input from '$lib/components/utils/Input.svelte';
	import { getImageURL } from '$lib/utils/utils.js';
	import Icon from '@iconify/svelte';
	import { toast } from '$lib/stores/toast';
	import Toast from '$lib/components/utils/Toast.svelte';

	export let data;
	export let form;
	let loading: any;

	$: loading = false;
	const showPreview = (event: any) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview') as HTMLImageElement;
			if (preview) {
				preview.src = src;
			}
		}
	};

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }: any) => {
			switch (result.type) {
				case 'success':
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

<div class="flex h-full w-full flex-col">
	<form
		action="?/updateProfile"
		method="POST"
		class="flex w-full flex-col space-y-2"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProfile}
	>
		<div class="text-2xl">Update Profile</div>
		<div class="divider" />
		<div class="form-control w-full max-w-lg">
			<!-- <label for="avatar" class="label  pb-1"> -->
			<!-- <span class="label-text">Profile Picture</span> -->
			<!-- </label> -->
			<label for="avatar" class="avatar mb-5 w-32 rounded-full hover:cursor-pointer">
				<label for="avatar" class="absolute -bottom-0.5 -right-0.5 z-20 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						{#if data.user?.avatar}
							<Icon icon="mdi-pencil" class="h-6 w-6" />
						{:else}
							<Icon icon="mdi-plus" class="h-6 w-6" />
						{/if}
					</span>
				</label>
				<div class="border-primary w-32 rounded-full border">
					{#if data.user?.avatar}
						<img
							src={data.user?.avatar
								? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
								: `https://ui-avatars.com/api/?name=${data.user?.email}`}
							alt="User avatar"
							id="avatar-preview"
						/>
					{:else}
						<Icon
							icon="mdi-account-circle"
							class="text-base-100 bg-primary h-full w-full scale-110 rounded-full"
						/>
					{/if}
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={showPreview}
				disabled={loading}
			/>
			{#if form?.errors?.avatar}
				{#each form?.errors?.avatar as error}
					<label for="avatar" class="label py-0 pt-1">
						<span class="label-text-alt text-error">
							{error}
						</span>
					</label>
				{/each}
			{/if}
		</div>
		<Input
			id="name"
			value={form?.data?.name ?? data?.user?.name}
			disabled={loading}
			errors={form?.errors?.name}
			placeholder="Name"
		/>

		<Input
			id="job_title"
			value={form?.data?.job_title ?? data?.user?.job_title}
			disabled={loading}
			errors={form?.errors?.job_title}
			placeholder="Title"
		/>

		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
				Update Profile
			</button>
		</div>
	</form>
</div>

<Toast type={$toast.type} message={$toast.message} show={$toast.show} />
