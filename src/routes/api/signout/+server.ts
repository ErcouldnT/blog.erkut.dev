import { redirect } from '@sveltejs/kit';

export async function GET({ locals: { supabase } }) {
	await supabase.auth.signOut({ scope: 'local' });
	return redirect(300, '/');
}
