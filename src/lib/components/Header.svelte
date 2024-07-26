<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { Home, Lock, LogOut } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let supabase: SupabaseClient;

	const signOut = async () => {
		await supabase.auth.signOut({ scope: 'local' });
		return goto('/');
	};
</script>

<header class="p-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<a class="btn" href="/"><Home /></a>
			{#if $page.data.session}
				<a class="btn variant-outline-success" href="/yeni">Yeni post</a>
			{/if}
		</div>

		<div class="flex items-center">
			{#if $page.data.session}
				<a class="btn variant-outline-success" href="/gunluk">Günlük</a>
				<button on:click={signOut} class="btn"><LogOut /></button>
			{:else}
				<a href="/in" class="btn"><Lock /></a>
			{/if}
		</div>
	</div>
</header>
