<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Tables } from '../types/supabase';

	export let post: Tables<'blog-posts'>;
</script>

<a class="card variant-ghost-primary card-hover overflow-hidden" href={post.slug}>
	<header>
		<img
			src="https://images.unsplash.com/photo-1620562303747-ba21ca6f1530?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2MjR8&ixlib=rb-4.0.3&w=400&h=175&auto=format&fit=crop"
			class="bg-black/50 w-full aspect-[21/9]"
			alt="Post"
		/>
	</header>
	<div class="p-4 space-y-4">
		<h3 class="h3" data-toc-ignore>{post.title}</h3>
		<h6 class="h6" data-toc-ignore>
			<span class="chip variant-filled-tertiary">halı</span>
			<span class="chip variant-filled-tertiary">kilim</span>
			<span class="chip variant-filled-tertiary">travel</span>
		</h6>
		<article>
			<p class="text-left text line-clamp-6">
				<!-- cspell:disable -->
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet
				eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias
				cum expedita architecto itaque quae rem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Numquam aspernatur provident eveniet eligendi cumque consequatur tempore sint nisi sapiente.
				Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
				<!-- cspell:enable -->
			</p>
		</article>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<Avatar
			src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=32&h=32&auto=format&fit=crop"
			width="w-8"
		/>
		<div class="flex-auto flex justify-between items-center">
			<h6 class="font-bold" data-toc-ignore>Erkut</h6>
			<small>{new Date(post.created_at).toLocaleDateString('tr')}</small>
		</div>
	</footer>
</a>
