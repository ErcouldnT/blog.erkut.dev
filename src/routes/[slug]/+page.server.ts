import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/server/queries';

export async function load({ params, locals: { supabase } }) {
	const { post, error: err } = await getPostBySlug(supabase, params.slug);

	if (err) {
		return error(404, params.slug + ' ait post bulunamadı.');
	}

	return {
		post
	};
}
