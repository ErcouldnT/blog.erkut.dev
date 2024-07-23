import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: posts } = await supabase.from('blog-posts').select('*').order('created_at');
	return { posts: posts ?? [] };
};
