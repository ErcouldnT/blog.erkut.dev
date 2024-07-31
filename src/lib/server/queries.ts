import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';
import DOMPurify from 'isomorphic-dompurify';

export const getPostBySlug = async (supabase: SupabaseClient<Database>, slug: string) => {
	const { data: post, error } = await supabase
		.from('blog-posts')
		.select()
		.eq('slug', slug)
		.limit(1)
		.single();

	if (post) {
		post.content = DOMPurify.sanitize(post.content);
	}

	return {
		post,
		error
	};
};
