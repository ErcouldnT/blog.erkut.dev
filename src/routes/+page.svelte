<script lang="ts">
	import PostCard from '$lib/PostCard.svelte';
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
	<h1>Son Yazılar</h1>
	<br />
</div>

{#await promise}
	<Loading />
{:then posts}
	<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each posts ?? [] as post}
			<PostCard {post} />
		{/each}
	</div>
{/await}
