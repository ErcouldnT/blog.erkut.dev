import type { Tables } from '../types/supabase';

export const load = async ({ fetch }) => {
	const getPosts = async () => {
		const res = await fetch('/api/posts');
		const posts = await res.json();
		return posts as Tables<'blog-posts'>[];
	};

	return {
		posts: getPosts(),
		lazy: {
			posts: []
		}
	};
};
