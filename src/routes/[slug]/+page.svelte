<script lang="ts">
	import SEO from '$lib/shared/SEO.svelte';
	import { Clock9, SquarePen } from 'lucide-svelte';
	import Tiptap from '$lib/Tiptap.svelte';
	import infoDate from '$lib/utils/infoDate.js';
	import readingTime from '$lib/utils/readingTime.js';

	export let data;
	const { post, user, supabase } = data;

	let editable = user?.id === post.author; // or admin

	const readingMinute = readingTime(post.content);
</script>

<SEO title={post.title} />

<div class="flex flex-row justify-between">
	<div>
		<div class="flex space-x-2">
			<Clock9 />
			<p>{readingMinute}</p>
		</div>
		<!-- <div class="flex space-x-2">
			<User />
			<p>{post.author}</p>
		</div> -->
		<div class="flex space-x-2 items-center">
			<SquarePen />
			<p class="text-sm">{infoDate(post.created_at)}</p>
		</div>
	</div>
	<div class="flex flex-col justify-end text-sm">
		{#if post.created_at !== post.updated_at}
			<div class="flex space-x-2">
				<p>{infoDate(post.updated_at)}</p>
				<!-- <PenLine /> -->
			</div>
			<p class="chip variant-filled-success">(Güncellendi)</p>
		{/if}
	</div>
</div>

<div class="prose prose-invert max-w-none">
	<Tiptap {supabase} content={post.content} {editable} id={post.id} />
</div>
