<script>
	export let data;
	$: ({ countries } = data);
</script>

<div class="prose prose-invert max-w-none">
	<h1>Welcome to Supabase!</h1>
	<ul>
		{#each countries as country}
			<li>{country.name}</li>
		{/each}
	</ul>
</div>
