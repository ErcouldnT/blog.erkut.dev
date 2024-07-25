<script lang="ts">
	import Tiptap from '$lib/Tiptap.svelte';

	export let data;
</script>

<div class="prose prose-invert max-w-none">
	<Tiptap supabase={data.supabase} content={data.post.content} />
</div>
