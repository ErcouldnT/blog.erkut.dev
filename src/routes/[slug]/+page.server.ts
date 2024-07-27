import { error } from '@sveltejs/kit';
import DOMPurify from 'isomorphic-dompurify';

export async function load({ params, locals: { supabase } }) {
	const getPost = async () => {
		const { data: post, error: err } = await supabase
			.from('blog-posts')
			.select()
			.eq('slug', params.slug)
			.limit(1)
			.single();

		if (err) {
			return error(404, params.slug + ' ait post bulunamadı.');
		}

		// post.content = DOMPurify.sanitize(post.content);
		return post;
	};

	return {
		post: await getPost()
	};
}
