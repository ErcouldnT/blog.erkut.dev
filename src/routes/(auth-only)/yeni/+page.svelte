<script lang="ts">
	import SEO from '$lib/shared/SEO.svelte';
	import Tiptap from '$lib/Tiptap.svelte';

	export let data;
	$: ({ supabase } = data);
</script>

<SEO title="Yeni post" />

<Tiptap editable={true} autofocus={true} {supabase} />
