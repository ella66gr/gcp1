<!-- src/lib/components/Navigation.svelte -->

<script>
  import { page } from '$app/stores';
  import { DarkMode } from 'flowbite-svelte';

  // Manual mobile menu state
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-b">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <!-- Brand -->
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse" on:click={closeMobileMenu}>
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
        SvelteKit Demo
      </span>
    </a>

    <!-- Right side buttons -->
    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <!-- Official Flowbite dark mode toggle -->
      <DarkMode class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" />

      <!-- Mobile menu button -->
      <button
        type="button"
        on:click={toggleMobileMenu}
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded={mobileMenuOpen}
        aria-label="Open main menu"
      >
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
    </div>

    <!-- Navigation menu -->
    <div class="items-center justify-between {mobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1" id="navbar-default">
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a
            href="/"
            on:click={closeMobileMenu}
            class="block py-2 px-3 rounded {$page.url.pathname === '/' ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}"
            aria-current={$page.url.pathname === '/' ? 'page' : undefined}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/components"
            on:click={closeMobileMenu}
            class="block py-2 px-3 rounded {$page.url.pathname === '/components' ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}"
            aria-current={$page.url.pathname === '/components' ? 'page' : undefined}
          >
            Components
          </a>
        </li>
        <li>
          <a
            href="/themes"
            on:click={closeMobileMenu}
            class="block py-2 px-3 rounded {$page.url.pathname === '/themes' ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}"
            aria-current={$page.url.pathname === '/themes' ? 'page' : undefined}
          >
            Themes
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>