<script lang="ts">
	import { onMount } from 'svelte';
	import { seo } from '$lib/stores/seo';
	import project from '$lib/config/project';

	export let title = project.title;
	export let description = project.description;

	const loadSeo = () => {
		seo.set({
			title,
			description
		});
	};

	onMount(() => {
		loadSeo();
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta name="keywords" content={project.keywords.join(', ')} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={project.url} />

	<meta property="twitter:url" content={project.url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
</svelte:head>
