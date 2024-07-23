<script>
	export let data;
	$: ({ posts } = data);
</script>

<div class="prose prose-invert max-w-none">
	<h1>Güncel</h1>
	<div class="flex flex-col">
		{#each posts as post}
			<a href="/{post.slug}">{post.title}</a>
		{/each}
	</div>
</div>
