<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Heading1, Heading2, Type, Save, Trash2 } from 'lucide-svelte';
	import { post } from './stores/post';
	import slugify from './utils/slugify';
	import findTitle from './utils/findTitle';

	let element: HTMLDivElement;
	let editor: Editor;
	let html: string;
	let title: string;
	let slug: string;
	let newPost = $page.url.pathname === '/yeni' ? true : false;

	export let content = $post;
	export let editable = false;
	export let autofocus = false;
	export let supabase: SupabaseClient;

	const resetContent = () => {
		// todo: confirmation popup
		post.reset();
		editor.commands.setContent($post);
	};

	// todo: form olarak backend e gönder
	const savePost = async () => {
		html = editor.getHTML();

		if (typeof findTitle(html) === 'string') {
			title = findTitle(html)!;
		} else {
			// todo: use popup or toast
			return alert('En az bir adet Ana Başlık (H1) yaz.');
		}

		slug = slugify(title);

		const { error } = await supabase.from('blog-posts').insert({
			title,
			slug,
			content: html
		});

		if (error) {
			// todo: use popup or toast
			return alert('Aynı başlıkta konu zaten mevcut.');
		}

		// return alert(title);
		post.reset();
		return goto('/');
	};

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				newPost && post.set(editor.getHTML());
			},
			editable,
			autofocus,
			editorProps: {
				attributes: {
					class:
						'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl prose-invert max-w-none focus:outline-none'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor && editable}
	<div class="flex gap-2 relative items-center">
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			<Heading1 />
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			<Heading2 />
		</button>
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			<Type />
		</button>
		<div class="absolute right-0 space-x-1">
			<button on:click={savePost}><Save /></button>
			<button on:click={resetContent}><Trash2 /></button>
		</div>
	</div>
{/if}

<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: orange;
		padding: 0.5rem;
		border-radius: 0.25rem;
	}
</style>
