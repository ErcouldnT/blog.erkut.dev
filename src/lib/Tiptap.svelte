<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import DOMPurify from 'isomorphic-dompurify';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { SupabaseClient } from '@supabase/supabase-js';
	// import type { Tables } from '../types/supabase';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Heading1, Heading2, Type, Save, Trash2 } from 'lucide-svelte';
	import { contentHtml } from './stores/content';
	import slugify from './utils/slugify';
	import findTitle from './utils/findTitle';

	export let id = 0;
	export let content = $contentHtml;
	export let editable = false;
	export let autofocus = false;
	export let supabase: SupabaseClient;

	// const post: Tables<"blog-posts">
	let element: HTMLDivElement;
	let editor: Editor;
	let html: string;
	let title: string;
	let slug: string;
	let newPost = $page.url.pathname === '/yeni' ? true : false; // or id === 0

	const toastStore = getToastStore();

	const addToast = (message: string, positive?: boolean) => {
		const t: ToastSettings = {
			message,
			background: positive ? 'variant-filled-secondary' : 'variant-filled-primary'
		};
		toastStore.trigger(t);
	};

	const removePost = async () => {
		// todo: confirmation modal
		if (id === 0) {
			// new post: clear content
			contentHtml.reset();
			editor.commands.setContent($contentHtml);
		} else {
			// remove post
			const { error } = await supabase.from('blog-posts').delete().eq('id', id);
			if (error) return addToast('Post silinemedi.');
			addToast('Post başarıyla silindi.', true); // todo: clear cache
			return goto('/');
		}
	};

	// todo: form olarak backend e gönder
	const savePost = async () => {
		html = editor.getHTML();

		if (typeof findTitle(html) === 'string') {
			title = findTitle(html)!;
		} else {
			// todo: use modal
			return alert('En az bir adet Ana Başlık (H1) yaz.');
		}

		slug = slugify(title);

		if (id === 0) {
			// new post
			const { error } = await supabase
				.from('blog-posts')
				.insert({
					title,
					slug,
					content: DOMPurify.sanitize(html) // todo: server-side DOMPurify!!!
				})
				.select();
			if (error) {
				// todo: use modal
				return alert('Aynı başlıkta konu zaten mevcut.');
			}
			contentHtml.reset();
			return goto('/' + slug);
		} else {
			// update
			const { error } = await supabase
				.from('blog-posts')
				.update({
					title,
					slug,
					content: DOMPurify.sanitize(html), // todo: server-side DOMPurify!!!
					updated_at: new Date()
				})
				.eq('id', id);
			if (error) {
				return addToast('Yazı güncellenemedi.');
			}
			addToast('Başarıyla güncellendi.', true); // todo: clear cache
			return goto('/' + slug);
		}
	};

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				newPost && contentHtml.set(editor.getHTML());
			},
			editable,
			autofocus,
			editorProps: {
				attributes: {
					class:
						'prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none focus:outline-none'
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
			<button on:click={removePost}><Trash2 /></button>
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
