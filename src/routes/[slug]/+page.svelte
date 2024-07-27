<script lang="ts">
	import SEO from '$lib/shared/SEO.svelte';
	import { Clock9, PenLine, SquarePen, User } from 'lucide-svelte';
	import Tiptap from '$lib/Tiptap.svelte';
	import infoDate from '$lib/utils/infoDate.js';
	import readingTime from '$lib/utils/readingTime.js';

	export let data;

	const readingMinute = readingTime(data.post.content);
</script>

<SEO title={data.post.title} />

<div class="flex flex-col space-y-1">
	<div class="flex space-x-2">
		<User />
		<p>{data.post.author}</p>
	</div>
	<div class="flex space-x-2">
		<SquarePen />
		<p>{infoDate(data.post.created_at)}</p>
	</div>
	{#if data.post.created_at !== data.post.updated_at}
		<div class="flex space-x-2">
			<PenLine />
			<p>Updated: {infoDate(data.post.updated_at)}</p>
		</div>
	{/if}
	<div class="flex space-x-2">
		<Clock9 />
		<p>{readingMinute}</p>
	</div>
</div>

<div class="prose prose-invert max-w-none">
	<Tiptap supabase={data.supabase} content={data.post.content} />
</div>
