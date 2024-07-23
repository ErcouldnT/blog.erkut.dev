<script lang="ts">
	import '../app.postcss';

	// Supabase Auth
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Components
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import Left from '$lib/Left.svelte';
	import Right from '$lib/Right.svelte';
</script>

<div class="grid grid-rows-[auto_1fr_auto]">
	<Header />
	<!-- Page -->
	<div class="container mx-auto grid grid-cols-1 xl:grid-cols-[200px_minmax(0px,_1fr)_200px]">
		<!-- Sidebar (Left): hidden in smaller screen sizes -->
		<Left />
		<!-- Main -->
		<main class="col-span-1 space-y-4 bg-green-500 p-4">
			<slot />
		</main>
		<!-- Sidebar (Right): hidden in smaller screen sizes -->
		<Right />
	</div>
	<Footer />
</div>
