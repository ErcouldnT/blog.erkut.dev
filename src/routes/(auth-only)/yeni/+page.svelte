<script lang="ts">
	import Tiptap from '$lib/Tiptap.svelte';

	export let data;
	$: ({ supabase } = data);
</script>

<Tiptap editable={true} autofocus={true} {supabase} />
