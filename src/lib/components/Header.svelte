<script lang="ts">
	import { Home, KeyRound } from 'lucide-svelte';

	export let isLoggedIn: string | undefined;
</script>

<header class="p-4">
	<div class="flex items-center relative">
		<a class="btn" href="/"><Home /></a>
		{#if isLoggedIn}
			<a class="btn variant-outline-success" href="/yeni">Yeni post</a>
		{:else}
			<a href="/dildo" class="btn absolute right-0"><KeyRound /></a>
		{/if}
	</div>
</header>
