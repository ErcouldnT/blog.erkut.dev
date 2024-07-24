import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase } }) {
	const res = await supabase.from('blog-posts').select('*').order('created_at');

	return json(res.data);
}
