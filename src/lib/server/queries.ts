import DOMPurify from 'isomorphic-dompurify';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';

export const getPostBySlug = async (supabase: SupabaseClient<Database>, slug: string) => {
	const { data: post } = await supabase
		.from('blog-posts')
		.select()
		.eq('slug', slug)
		.limit(1)
		.maybeSingle();

	// if (!post) {
	// 	return Promise.reject('404');
	// }

	if (post) {
		post.content = DOMPurify.sanitize(post.content);
	}

	return {
		post
	};
};
