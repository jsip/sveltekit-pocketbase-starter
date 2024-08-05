<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import Icon from '@iconify/svelte';
	import { getImageURL } from '$lib/utils/utils';
	import { currentUser } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { navLinks } from '$lib/utils/nav';

	export const data: any = {};

	const handleLogout = () => {
		pb.authStore.clear();
		goto('/');
	};
</script>

<div class="navbar text-base-content mx-auto max-w-2xl">
	<div class="flex-1">
		<a href={$currentUser ? '/' : '/'} class="btn btn-primary text-xl" aria-label="Home"></a>
	</div>
	<div class="flex-none gap-2">
		{#if $currentUser}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">
					<div class="lg:tooltip lg:tooltip-left" data-tip="Theme Selector">
						<button class="btn btn-ghost" name="theme-toggle" aria-label="Toggle Theme Selector">
							<div class="font-normal lowercase">
								<Icon icon="gridicons-themes" class="h-6 w-6" />
							</div>
						</button>
					</div>
				</div>
			</div>

			<div class="dropdown dropdown-end">
				<div
					tabindex="0"
					role="button"
					class="btn btn-primary btn-circle avatar flex items-center justify-center"
					aria-label="User Menu"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<div class="h-full w-full rounded-full">
						{#if $currentUser?.avatar}
							<img
								src={$currentUser?.avatar
									? getImageURL($currentUser?.collectionId, $currentUser?.id, $currentUser?.avatar)
									: `https://ui-avatars.com/api/?name=${$currentUser?.username}`}
								alt="User avatar"
							/>
						{:else}
							<Icon
								icon="mdi-account-circle"
								class="transition-scale text-base-100 h-full w-full scale-[110%] rounded-full duration-200 md:hover:scale-[105%]"
							/>
						{/if}
					</div>
				</div>

				<!-- Sidebar content here -->
				<ul
					tabindex="-1"
					class="dropdown-content fomt-semibold menu bg-base-100 rounded-box border-primary z-50 mt-3 w-fit border-[0.5px] p-2 shadow"
					aria-label="User Menu"
				>
					<li class="">
						<div class="">
							<a href="/my/settings/profile" class="flex gap-2" aria-label="Profile Settings">
								<div class="btn btn-primary btn-circle avatar">
									{#if $currentUser?.avatar}
										<img
											src={$currentUser?.avatar
												? getImageURL(
														$currentUser?.collectionId,
														$currentUser?.id,
														$currentUser?.avatar
													)
												: `https://ui-avatars.com/api/?name=${$currentUser?.username}`}
											alt="User avatar"
											class="max-w-12 rounded-full object-cover"
										/>
									{:else}
										<Icon
											icon="mdi-account-circle"
											class="transition-scale text-base-100 h-full w-full scale-[110%] rounded-full duration-200 md:hover:scale-[105%]"
										/>
									{/if}
								</div>

								<div class="flex flex-col">
									<div>
										@{$currentUser?.username}
									</div>

									<div class="text-xs font-thin">
										{$currentUser?.email}
									</div>
								</div>
							</a>
						</div>
					</li>

					<div class="my-2">
						{#each navLinks as link}
							<li>
								<a href={link.href} aria-label={link.name} class="text-nowrap">
									<div class="flex items-center gap-2 font-bold">
										<Icon icon={link.icon} class="h-5 w-5" />
										<div>{link.name}</div>
										{#if link.new}
											<div class="badge badge-sm badge-accent">new</div>
										{/if}
									</div>
								</a>
							</li>
						{/each}
					</div>

					<form
						class="flex w-full"
						method="POST"
						action="/auth/logout"
						on:submit={handleLogout}
						aria-label="Logout"
					>
						<button class="btn group/logoutButton w-full" aria-label="Logout">
							<div class="flex w-full items-center justify-between">
								<div class="font-bold">Logout</div>
								<Icon
									icon="mdi-logout"
									class="h-5 w-5 transition-all duration-300 md:group-hover/logoutButton:translate-x-1"
								/>
							</div>
						</button>
					</form>
				</ul>
			</div>
		{:else}
			<div class="flex items-center text-sm">
				<div>
					<a href="/auth/login" class="btn btn-ghost" aria-label="Log in">Log in</a>
				</div>
				<div>
					<a href="/auth/register" class="btn btn-ghost" aria-label="Register">Register</a>
				</div>
			</div>
		{/if}
	</div>
</div>
