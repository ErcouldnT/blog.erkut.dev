import { getPostBySlug } from '$lib/server/queries';

export async function load({ params, locals: { supabase } }) {
	return {
		post: getPostBySlug(supabase, params.slug)
	};
}
