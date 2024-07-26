import { redirect, fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const loginSchema = z.object({
	email: z.string().email('Geçersiz email.'),
	password: z.string().min(10, 'En az 10 karakter uzunluğunda olmalıdır.')
});

export const load = async () => {
	const form = await superValidate(zod(loginSchema));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	// signup: async ({ request, locals: { supabase } }) => {
	// 	const formData = await request.formData();
	// 	const email = formData.get('email') as string;
	// 	const password = formData.get('password') as string;

	// 	const { error } = await supabase.auth.signUp({ email, password });
	// 	if (error) {
	// 		console.error(error);
	// 		redirect(303, '/in/error');
	// 	} else {
	// 		redirect(303, '/');
	// 	}
	// },
	login: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		const email = form.data.email.trim();
		const password = form.data.password;

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			form.valid = false;
			return message(form, 'Lütfen bilgileri kontrol ediniz.');
		}

		// otherwise hooks.server.ts redirects immediately after return
		return redirect(300, '/');
	}
};
