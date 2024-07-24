<script lang="ts">
	import Loading from '$lib/shared/Loading.svelte';
	import type { Database } from '../types/supabase';

	async function getPosts() {
		const res = await fetch('/api/posts');
		const posts = await res.json();
		return posts as Database['public']['Tables']['blog-posts']['Row'][];
	}

	let promise = getPosts();
</script>

<div class="prose prose-invert max-w-none">
	<h1>Güncel</h1>
	{#await promise}
		<Loading />
	{:then posts}
		<div class="flex flex-col">
			{#each posts ?? [] as post}
				<a href="/{post.slug}">{post.title}</a>
			{/each}
		</div>
	{/await}
</div>
