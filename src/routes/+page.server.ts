import { error } from '@sveltejs/kit';
import { redis } from '$lib/server/redis';
import constant from '$lib/config/constant';
import type { Tables } from '../types/supabase.js';

export const load = async ({ locals: { supabase }, setHeaders }) => {
	// const get10Posts = async () => {
	// 	const { data: posts, error: err } = await supabase
	// 		.from('blog-posts')
	// 		.select()
	// 		.order('created_at', { ascending: false })
	// 		.limit(10);

	// 	if (err) return error(500, { message: 'Database connection error' });
	// 	return posts;
	// };

	// const skip10Posts = async () => {
	// 	const { data: posts, error: err } = await supabase
	// 		.from('blog-posts')
	// 		.select()
	// 		.order('created_at', { ascending: false })
	// 		.range(10, 99);

	// 	if (err) return error(500, { message: 'Load more posts error' });
	// 	return posts;
	// };

	// Redis cache
	const cached = await redis.get('all-posts');

	if (cached) {
		console.log('Cache hit!');
		const ttl = await redis.ttl('all-posts');

		setHeaders({
			'cache-control': 'max-age=' + ttl
		});

		return {
			posts: cached as Tables<'blog-posts'>[]
		};
	}

	const getAllPosts = async () => {
		console.log('Cache miss!');

		const { data: posts, error: err } = await supabase
			.from('blog-posts')
			.select()
			.order('created_at', { ascending: false });

		if (err) return error(500, { message: 'Database connection error' });

		await redis.set('all-posts', posts, {
			ex: constant.redis.TTL
		});
		return posts;
	};

	// Local cache
	setHeaders({
		'cache-control': 'max-age=' + constant.redis.TTL
	});

	return {
		posts: getAllPosts()
		// lazy: {
		// 	posts: skip10Posts()
		// }
	};
};
