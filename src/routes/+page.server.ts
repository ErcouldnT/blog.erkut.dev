import { error } from '@sveltejs/kit';

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

	// todo: redis cache
	const getAllPosts = async () => {
		const { data: posts, error: err } = await supabase
			.from('blog-posts')
			.select()
			.order('created_at', { ascending: false });

		if (err) return error(500, { message: 'Database connection error' });
		return posts;
	};

	// caching
	setHeaders({
		'cache-control': 'max-age=60'
	});

	return {
		posts: getAllPosts()
		// lazy: {
		// 	posts: skip10Posts()
		// }
	};
};
