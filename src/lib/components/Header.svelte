<script lang="ts">
	import { goto } from '$app/navigation';
	import { Home, KeyRound, LogOut } from 'lucide-svelte';

	export let data;

	const signOut = async () => {
		await data.supabase.auth.signOut({ scope: 'local' });
		return goto('/');
	};
</script>

<header class="p-4">
	<div class="flex items-center relative">
		<a class="btn" href="/"><Home /></a>
		{#if data.user}
			<a class="btn variant-outline-success" href="/yeni">Yeni post</a>
			<button on:click={signOut} class="btn absolute right-0"><LogOut /></button>
		{:else}
			<a href="/in" class="btn absolute right-0"><KeyRound /></a>
		{/if}
	</div>
</header>
