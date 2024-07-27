import { error } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	const getPosts = async () => {
		const { data: posts, error: err } = await supabase
			.from('blog-posts')
			.select()
			.order('created_at', { ascending: false });

		if (err) return error(500, { message: 'Database connection error' });

		return posts;
	};

	return {
		posts: getPosts(),
		lazy: {
			posts: []
		}
	};
};
