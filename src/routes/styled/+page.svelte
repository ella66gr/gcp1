<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { Card, Button, Input, Label, Badge, Textarea } from 'flowbite-svelte';

  type Template = {
    id: number;
    name: string;
    description: string;
    section: string;
    config_json: object;
  };

  let templates: Template[] = [];

  let form = {
    name: '',
    description: '',
    section: '',
    config_json: ''
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
    try {
      const parsed = JSON.parse(form.config_json);
      const insertData = {
        name: form.name,
        description: form.description,
        section: form.section,
        config_json: parsed
      };

      const { error } = await supabase.from('templates').insert([insertData]);
      if (error) {
        console.error(error);
        saveStatus = 'error';
      } else {
        saveStatus = 'success';
        await loadTemplates();
        form = { name: '', description: '', section: '', config_json: '' };
      }
    } catch (err) {
      alert('Invalid JSON in Template JSON field. Please correct it before saving.');
      return;
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
  <div class="max-w-7xl mx-auto space-y-10">

    <!-- Create Template Form -->
    <Card class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Template</h2>
      <form on:submit|preventDefault={createTemplate} class="space-y-5">
        <div>
          <Label for="name">Template Name</Label>
          <Input id="name" bind:value={form.name} required class="mt-1 w-full" />
        </div>
        <div>
          <Label for="description">Template Description</Label>
          <Input id="description" bind:value={form.description} required class="mt-1 w-full" />
        </div>
        <div>
          <Label for="section">Newsletter Section</Label>
          <Input id="section" bind:value={form.section} required class="mt-1 w-full" />
        </div>
        <div>
          <Label for="config_json">Template JSON</Label>
          <Textarea
            id="config_json"
            bind:value={form.config_json}
            rows="6"
            required
            class="mt-1 w-full resize-y"
          />
        </div>
        <div class="flex justify-end gap-4 pt-2">
          <Button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-sm">
            Save
          </Button>
          <Button color="alternative" type="reset" on:click={() => (form = { name: '', description: '', section: '', config_json: '' })}>
            Reset
          </Button>
        </div>
        {#if saveStatus === 'success'}
          <p class="text-green-600 dark:text-green-400 pt-2">Template saved successfully.</p>
        {:else if saveStatus === 'error'}
          <p class="text-red-600 dark:text-red-400 pt-2">Error saving template.</p>
        {/if}
      </form>
    </Card>

    <!-- Existing Templates Table -->
    <Card class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Existing Templates</h2>
      {#if templates.length === 0}
        <p class="text-gray-600 dark:text-gray-300">No templates available.</p>
      {:else}
        <div class="overflow-x-auto">
          <table class="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead class="bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <tr>
                <th class="px-4 py-3">Name</th>
                <th class="px-4 py-3">Description</th>
                <th class="px-4 py-3">Section</th>
                <th class="px-4 py-3">JSON</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {#each templates as template (template.id)}
                <tr>
                  <td class="px-4 py-3 text-gray-900 dark:text-white font-semibold">{template.name}</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{template.description}</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{template.section}</td>
                  <td class="px-4 py-3">
                    <pre class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded p-2 overflow-x-auto max-w-full">
{JSON.stringify(template.config_json, null, 2)}
                    </pre>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <Button color="red" size="sm" on:click={() => deleteTemplate(template.id)}>Delete</Button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </Card>

  </div>
</div>