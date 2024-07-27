import { error } from '@sveltejs/kit';

export async function load({ params, locals: { supabase } }) {
	// todo: create api route
	const { data: post, error: err } = await supabase
		.from('blog-posts')
		.select()
		.eq('slug', params.slug)
		.limit(1)
		.single();

	if (err) {
		return error(404, params.slug + ' ait post bulunamadı.');
	}

	return {
		post
	};
}
