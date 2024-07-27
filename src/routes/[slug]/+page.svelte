<script lang="ts">
	import SEO from '$lib/shared/SEO.svelte';
	import { Clock9, PenLine, SquarePen, User } from 'lucide-svelte';
	import Tiptap from '$lib/Tiptap.svelte';
	import infoDate from '$lib/utils/infoDate.js';
	import readingTime from '$lib/utils/readingTime.js';

	export let data;
	const { post, user, supabase } = data;

	let editable = user?.id === post.author; // or admin

	const readingMinute = readingTime(post.content);
</script>

<SEO title={post.title} />

<div class="flex flex-col space-y-1">
	<div class="flex space-x-2">
		<User />
		<p>{post.author}</p>
	</div>
	<div class="flex space-x-2">
		<SquarePen />
		<p>{infoDate(post.created_at)}</p>
	</div>
	{#if post.created_at !== post.updated_at}
		<div class="flex space-x-2">
			<PenLine />
			<p>{infoDate(post.updated_at)} (Güncellendi)</p>
		</div>
	{/if}
	<div class="flex space-x-2">
		<Clock9 />
		<p>{readingMinute}</p>
	</div>
</div>

<div class="prose prose-invert max-w-none">
	<Tiptap {supabase} content={post.content} {editable} id={post.id} />
</div>
