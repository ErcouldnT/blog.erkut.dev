<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Heading1, Heading2, Save, Type } from 'lucide-svelte';

	let element: HTMLDivElement;
	let editor: Editor;

	export let editable = false;
	export let autofocus = false;
	export let supabase: SupabaseClient;

	const savePost = async () => {
		await supabase.from('blog-posts').insert({
			content: editor.getHTML()
		});
		// return alert(editor.getHTML());
		return goto('/');
	};

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '<h1>Başlık</h1>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
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

{#if editor}
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
		<button on:click={savePost} class="absolute right-0"><Save /></button>
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
