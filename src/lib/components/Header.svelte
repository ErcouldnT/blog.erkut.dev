<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
	import { Home, Lock, LogOut } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let supabase: SupabaseClient;

	const signOut = async () => {
		await supabase.auth.signOut({ scope: 'local' });
		return goto('/');
	};
</script>

<header class="p-4">
	<div class="flex items-center relative">
		<a class="btn" href="/"><Home /></a>
		{#if $page.data.session}
			<a class="btn variant-outline-success" href="/yeni">Yeni post</a>
			<button on:click={signOut} class="btn absolute right-0"><LogOut /></button>
		{:else}
			<a href="/in" class="btn absolute right-0"><Lock /></a>
		{/if}
	</div>
</header>
