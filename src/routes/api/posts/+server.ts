import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase } }) {
	const { data } = await supabase
		.from('blog-posts')
		.select()
		.order('created_at', { ascending: false });

	// todo: cache-control and redis
	return json(data);
}
