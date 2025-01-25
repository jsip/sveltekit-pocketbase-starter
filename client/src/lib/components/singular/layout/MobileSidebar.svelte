<script lang="ts">
	import Icon from "@iconify/svelte";
	import DarkMode from "../DarkMode.svelte";
  import { headerNavLinks } from '$lib/utils/nav';
  import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

  export let isMobileSidebarOpen = false;
  
  const toggleSidebar = (open: boolean) => {
    isMobileSidebarOpen = open;
  };

  const handleLogout = () => {
		pb.authStore.clear();
		goto('/');
	};
</script>

<div
  class={`fixed inset-0 z-50 transition-opacity duration-300 ${
    isMobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
  } lg:hidden`}
  role="dialog"
  aria-modal="true"
>
  <div
    class="fixed inset-0 bg-gray-900/5"
    aria-hidden="true"
    on:click={() => toggleSidebar(false)}
  ></div>

  <div
    class={`fixed inset-0 flex transform transition-transform duration-300 ${
      isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <div class="relative mr-16 flex w-full max-w-xs flex-1">
      <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
        <button type="button" on:click={() => toggleSidebar(false)} class="fixed inset-0 z-10">
          <span class="sr-only">Close sidebar</span>
        </button>
      </div>

      <!-- Sidebar content -->
      <div
        class="z-20 m-8 mt-16 flex grow flex-col gap-y-5 overflow-y-auto rounded-xl bg-white px-6 pb-4 dark:bg-zinc-900"
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
                  action="/auth/logout"
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
  </div>
</div>