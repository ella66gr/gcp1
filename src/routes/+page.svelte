<!-- src/routes/+page.svelte -->

<script>
  import { Button, Card, Badge, Input, Label, Textarea, DarkMode } from 'flowbite-svelte';

  let formData = {
    name: '',
    email: '',
    message: ''
  };
</script>

<svelte:head>
  <title>SvelteKit + Tailwind CSS v4 + Flowbite Svelte</title>
  <meta name="description" content="Modern SvelteKit setup with Tailwind CSS v4 and Flowbite Svelte components" />
</svelte:head>

<!-- Main container with proper responsive padding -->
<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header Section - Full width with proper spacing -->
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          SvelteKit + Tailwind CSS v4 + Flowbite Svelte
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          A modern web development stack with production-ready components, responsive design, and professional layouts
        </p>

        <!-- Theme Toggle -->
        <div class="flex justify-center mb-8">
          <DarkMode class="gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg" />
        </div>

        <!-- Technology Badges -->
        <div class="flex gap-3 justify-center flex-wrap">
          <Badge color="blue" class="text-sm px-3 py-1.5">SvelteKit</Badge>
          <Badge color="purple" class="text-sm px-3 py-1.5">Tailwind CSS v4</Badge>
          <Badge color="green" class="text-sm px-3 py-1.5">Flowbite Svelte</Badge>
          <Badge color="orange" class="text-sm px-3 py-1.5">Vite</Badge>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content Area -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

    <!-- Feature Grid - Professional 3-column responsive layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 mb-16">
      <Card class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Fast Development</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Hot module replacement and instant feedback with Vite's lightning-fast development server and modern tooling.
        </p>
        <Badge color="blue">Performance</Badge>
      </Card>

      <Card class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">🎨</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Modern Styling</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Tailwind CSS v4 with improved performance, better developer experience, and cutting-edge design capabilities.
        </p>
        <Badge color="purple">Design</Badge>
      </Card>

      <Card class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">🧩</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Rich Components</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Flowbite Svelte provides 45+ components with excellent theming, accessibility, and responsive behavior.
        </p>
        <Badge color="green">Components</Badge>
      </Card>
    </div>

    <!-- Two-Column Layout Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">

      <!-- Contact Form - Takes 2 columns on XL screens -->
      <div class="xl:col-span-2">
        <Card class="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Form Demo</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Demonstrating Flowbite Svelte form components with proper theming and responsive layout
            </p>
          </div>

          <form class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label for="name" class="mb-2">Full Name</Label>
                <Input 
                  id="name" 
                  bind:value={formData.name}
                  placeholder="Enter your full name"
                  required
                  class="w-full"
                />
              </div>
              <div>
                <Label for="email" class="mb-2">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  bind:value={formData.email}
                  placeholder="your.email@example.com"
                  required
                  class="w-full"
                />
              </div>
            </div>

            <div>
              <Label for="message" class="mb-2">Message</Label>
              <Textarea 
                id="message" 
                bind:value={formData.message}
                placeholder="Tell us about your project..."
                rows="4"
                class="w-full"
              />
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <Button type="submit" class="flex-1 sm:flex-none px-8">
                Send Message
              </Button>
              <Button color="alternative" type="button" class="flex-1 sm:flex-none px-8">
                Save Draft
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <!-- Statistics/Info Sidebar - Takes 1 column on XL screens -->
      <div class="space-y-6">
        <Card class="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Stats</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">Components</span>
              <span class="font-semibold text-gray-900 dark:text-white">45+</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">Build Time</span>
              <span class="font-semibold text-gray-900 dark:text-white">~2s</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">Bundle Size</span>
              <span class="font-semibold text-gray-900 dark:text-white">~45KB</span>
            </div>
          </div>
        </Card>

        <Card class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <div class="space-y-3">
            <a href="/components" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              → View Components
            </a>
            <a href="/themes" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              → Explore Themes
            </a>
            <a href="https://flowbite-svelte.com" target="_blank" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              → Documentation
            </a>
          </div>
        </Card>
      </div>
    </div>

    <!-- Bottom Section - Why This Stack -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why This Stack?</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Built for modern development teams who need reliability, performance, and exceptional developer experience
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
              <span class="text-blue-600 dark:text-blue-400">👨‍💻</span>
            </div>
            Developer Experience
          </h3>
          <ul class="space-y-3 text-gray-600 dark:text-gray-300">
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              TypeScript support out of the box
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              Hot reload for instant feedback
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              Modern build tooling with Vite
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              Excellent debugging capabilities
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
              <span class="text-green-600 dark:text-green-400">🚀</span>
            </div>
            Production Ready
          </h3>
          <ul class="space-y-3 text-gray-600 dark:text-gray-300">
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              Optimized builds and code splitting
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              SEO-friendly with SSR support
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              Accessible components by default
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3 mt-1">✓</span>
              Easy deployment to any platform
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</div>