<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { Card, Button, Input, Label, Badge } from 'flowbite-svelte';

  type Template = {
    id: number;
    name: string;
    type: string;
    json: string;
  };

  let templates: Template[] = [];

  let form = {
    name: '',
    type: '',
    json: ''
  };

  let saveStatus: 'idle' | 'success' | 'error' = 'idle';

  const loadTemplates = async () => {
    const { data, error } = await supabase.from('templates').select('*').order('id', { ascending: true });
    if (error) {
      console.error(error);
    } else {
      templates = data as Template[];
    }
  };

  const createTemplate = async () => {
    const { error } = await supabase.from('templates').insert([form]);
    if (error) {
      console.error(error);
      saveStatus = 'error';
    } else {
      saveStatus = 'success';
      await loadTemplates();
      form = { name: '', type: '', json: '' };
    }

    setTimeout(() => (saveStatus = 'idle'), 3000);
  };

  const deleteTemplate = async (id: number) => {
    const { error } = await supabase.from('templates').delete().eq('id', id);
    if (error) {
      console.error(error);
    } else {
      await loadTemplates();
    }
  };

  onMount(() => {
    loadTemplates();
  });
</script>

<svelte:head>
  <title>Styled Control Panel</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto space-y-10">
    <!-- Form -->
    <Card class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Template</h2>
      <form on:submit|preventDefault={createTemplate} class="space-y-6">
        <div>
          <Label for="name">Name</Label>
          <Input id="name" bind:value={form.name} required class="mt-1 w-full" />
        </div>
        <div>
          <Label for="type">Type</Label>
          <Input id="type" bind:value={form.type} required class="mt-1 w-full" />
        </div>
        <div>
          <Label for="json">Template JSON</Label>
          <Input id="json" bind:value={form.json} required class="mt-1 w-full" />
        </div>
        <div class="flex justify-end gap-4 pt-2">
          <Button type="submit" color="primary">Save</Button>
          <Button color="alternative" type="reset" on:click={() => (form = { name: '', type: '', json: '' })}>Reset</Button>
        </div>
        {#if saveStatus === 'success'}
          <p class="text-green-600 dark:text-green-400 pt-2">Template saved successfully.</p>
        {:else if saveStatus === 'error'}
          <p class="text-red-600 dark:text-red-400 pt-2">Error saving template.</p>
        {/if}
      </form>
    </Card>

    <!-- Table -->
    <Card class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Existing Templates</h2>
      {#if templates.length === 0}
        <p class="text-gray-600 dark:text-gray-300">No templates available.</p>
      {:else}
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead class="bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">JSON</th>
              <th class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {#each templates as template (template.id)}
              <tr>
                <td class="px-4 py-3 text-gray-900 dark:text-white">{template.name}</td>
                <td class="px-4 py-3">
                  <Badge color="blue">{template.type || '—'}</Badge>
                </td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300 truncate max-w-xs">{template.json}</td>
                <td class="px-4 py-3 text-right">
                  <Button color="red" size="sm" on:click={() => deleteTemplate(template.id)}>Delete</Button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </Card>
  </div>
</div>