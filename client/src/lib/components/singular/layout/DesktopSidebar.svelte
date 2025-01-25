<script lang="ts">
	import Icon from "@iconify/svelte";
	import DarkMode from "../DarkMode.svelte";
  import { headerNavLinks } from '$lib/utils/nav';
  import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

  export let isDesktopSidebarOpen = true;

  const toggleSidebar = (open: boolean) => {
    isDesktopSidebarOpen = open;
  };

  const handleLogout = () => {
		pb.authStore.clear();
		goto('/');
	};
</script>

<div
  class="relative hidden transform transition-transform duration-300 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col {isDesktopSidebarOpen
    ? ''
    : '-translate-x-full'}"
>
  <button
    type="button"
    class="absolute {isDesktopSidebarOpen ? '-right-4' : '-right-10'} group top-16"
    on:click={() => toggleSidebar(!isDesktopSidebarOpen)}
  >
    <Icon
      icon="mdi-swap-horizontal"
      class="h-8 w-8 rounded-full border-2 border-gray-50 bg-white p-1 text-primary shadow transition-transform will-change-transform group-hover:-translate-x-2 dark:border-slate-700 dark:bg-gray-900 dark:text-white"
    />
  </button>

  <div
    class="m-4 mr-0 flex grow flex-col gap-y-5 overflow-y-auto rounded-xl border border-gray-50 px-6 pb-4 shadow dark:border-slate-700 dark:shadow-slate-700"
  >
    <div class="flex h-16 shrink-0 items-center">
      <img class="h-8 w-auto dark:hidden" src="/logo.png" alt="Starter" />
      <img class="hidden h-8 w-auto dark:block" src="/logo.png" alt="Starter" />
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            {#each headerNavLinks as navItem}
              <li>
                <a
                  href={navItem.href}
                  class="group block w-full rounded-lg p-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
                  aria-label="Navigation link"
                >
                  <div class="flex items-center gap-2 font-semibold">
                    <Icon
                      icon={navItem.icon}
                      class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                    <div>{navItem.name}</div>
                  </div>
                </a>
              </li>
            {/each}
          </ul>
        </li>
        <li>
          <div class="text-xs font-semibold text-gray-400">List title</div>
          <ul role="list" class="mt-2 space-y-1"></ul>
        </li>
        <li class="mt-auto">
          <a
            href="/my/settings"
            class="group block w-full rounded-lg py-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
            aria-label="Settings"
          >
            <div class="flex items-center gap-2 font-semibold">
              <Icon
                icon="mdi-settings"
                class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              />
              <div>Settings</div>
            </div>
          </a>

          <div class="flex w-full justify-between">
            <form
              class="flex w-full flex-1"
              method="POST"
              action="/logout"
              on:submit={handleLogout}
              aria-label="Logout"
            >
              <button
                class="group block w-full rounded-lg py-2 text-sm leading-7 text-primary hover:bg-tertiary/20 dark:text-white dark:hover:bg-tertiary/5"
                aria-label="Logout"
              >
                <div class="flex items-center gap-2 font-semibold">
                  <Icon
                    icon="mdi-logout"
                    class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <div>Logout</div>
                </div>
              </button>
            </form>

            <DarkMode />
          </div>
        </li>
      </ul>
    </nav>
  </div>
</div>