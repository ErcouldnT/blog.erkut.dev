import { error, json } from '@sveltejs/kit';

export async function GET({ locals: { supabase } }) {
	const { data: posts, error: err } = await supabase
		.from('blog-posts')
		.select()
		.order('created_at', { ascending: false });

	if (err) {
		return error(500);
	}

	// todo: cache-control and redis
	return json(posts);
}
