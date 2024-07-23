<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Heading1, Heading2, Type } from 'lucide-svelte';

	/**
	 * @type {HTMLDivElement}
	 */
	let element;
	/**
	 * @type {Editor}
	 */
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '<h1>Hello World! 🌍️ </h1>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			autofocus: false,
			editorProps: {
				attributes: {
					class:
						'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl max-w-none focus:outline-none'
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
	<div>
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
