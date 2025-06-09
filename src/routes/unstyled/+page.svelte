<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { TemplateRow } from '$lib/templateSchema';

	let templates: TemplateRow[] = [];

	// Form state
	let form: Partial<TemplateRow> = {
		is_active: true,
		config_json: {}
	};
	let rawJson =
		'{\n  "cta": {\n    "text": "Click here",\n    "url": "https://example.com"\n  }\n}';
	let statusMessage = '';
	let isEditing = false;

	onMount(loadTemplates);

	async function loadTemplates() {
		const { data, error } = await supabase
			.from('templates')
			.select('*')
			.order('created_at', { ascending: false });
		if (error) {
			console.error('Load error:', error.message);
		} else {
			templates = data as TemplateRow[];
		}
	}

	function resetForm() {
		form = { is_active: true, config_json: {} };
		rawJson = '{\n  "cta": {\n    "text": "Click here",\n    "url": "https://example.com"\n  }\n}';
		isEditing = false;
		statusMessage = '';
	}

	async function handleSubmit() {
		try {
			form.config_json = JSON.parse(rawJson);
		} catch (err) {
			statusMessage = '❌ Invalid JSON format.';
			return;
		}

		if (!form.name || !form.description || !form.section) {
			statusMessage = '❌ Please complete all fields.';
			return;
		}

		if (isEditing && form.id) {
			const { error } = await supabase
				.from('templates')
				.update({
					name: form.name,
					description: form.description,
					section: form.section,
					config_json: form.config_json,
					is_active: form.is_active
				})
				.eq('id', form.id);
			statusMessage = error ? `❌ Update failed: ${error.message}` : '✅ Template updated.';
		} else {
			const { error } = await supabase.from('templates').insert([form]);
			statusMessage = error ? `❌ Creation failed: ${error.message}` : '✅ Template created.';
		}

		await loadTemplates();
		resetForm();
	}

	function editTemplate(template: TemplateRow) {
		form = { ...template };
		rawJson = JSON.stringify(template.config_json, null, 2);
		isEditing = true;
		statusMessage = '';
	}

	async function deleteTemplate(id: number) {
		if (!confirm('Are you sure you want to delete this template?')) return;

		console.log('Deleting template with ID:', id, typeof id);

		const { error, data } = await supabase.from('templates').delete().eq('id', id);

		console.log('Supabase delete response:', { error, data });

		statusMessage = error ? `❌ Delete failed: ${error.message}` : '✅ Template deleted.';
		await loadTemplates();

		if (form.id === id) resetForm();
	}
</script>

<h1>Templates</h1>

<section>
	{#each templates as t}
		<div class="template-block">
			<strong>{t.name}</strong>
			<div>{t.description}</div>
			<div><em>Section:</em> {t.section} | <em>Active:</em> {t.is_active ? 'Yes' : 'No'}</div>
			<button on:click={() => editTemplate(t)}>Edit</button>
			<button on:click={() => deleteTemplate(t.id)}>Delete</button>
		</div>
	{/each}
</section>

<h2>{isEditing ? 'Edit Template' : 'Create New Template'}</h2>

{#if statusMessage}
	<p>{statusMessage}</p>
{/if}

<div>
	<h2>Template Form</h2>
	<p>________________________________________________________________________________</p>
	<p>Use the form below to create or edit a template.</p>
</div>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<label>Template Name</label><br />
		<input bind:value={form.name} required />
	</div>
	<div>
		<label>Template Description</label><br />
		<input bind:value={form.description} required />
	</div>
	<div>
		<label>Newsletter Section</label><br />
		<input bind:value={form.section} required />
	</div>
	<div>
		<label>Template JSON</label><br />
		<textarea rows="8" bind:value={rawJson}></textarea>
	</div>
	<div>
		<label><input type="checkbox" bind:checked={form.is_active} /> Active</label>
	</div>
	<button type="submit">{isEditing ? 'Update Template' : 'Create Template'}</button>
	{#if isEditing}
		<button type="button" on:click={resetForm}>Cancel</button>
	{/if}
</form>

<style>
	section {
		margin-bottom: 2rem;
	}
	.template-block {
		margin-bottom: 1rem;
		padding: 1rem;
		background: #f9f9f9;
		border-radius: 8px;
	}
	textarea {
		width: 100%;
		font-family: monospace;
	}
</style>
