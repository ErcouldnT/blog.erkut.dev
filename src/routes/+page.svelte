<script lang="ts">
	import SEO from '$lib/shared/SEO.svelte';
	import PostCard from '$lib/PostCard.svelte';
	import Loading from '$lib/shared/Loading.svelte';

	export let data;
</script>

<SEO />

<div class="prose prose-invert max-w-none">
	<h1>Son Yazılar</h1>
	<br />
</div>

{#await data.posts}
	<Loading />
{:then posts}
	<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each posts ?? [] as post}
			<PostCard {post} />
		{/each}
	</div>
{:catch}
	<p>Error loading posts...</p>
{/await}
