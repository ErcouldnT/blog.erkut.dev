<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	export let data;
	const { form, enhance, errors, constraints, message, capture, restore } = superForm(data.form); // Client form api
	export const snapshot = { capture, restore };
</script>

<form class="flex flex-col space-y-4 max-w-md mx-auto" method="POST" action="?/login" use:enhance>
	{#if $message}<small class="invalid">{$message}</small>{/if}
	<label for="email" class="label">
		<span>Email</span>
		<input
			class="input"
			name="email"
			type="email"
			bind:value={$form.email}
			aria-invalid={$errors.email ? 'true' : undefined}
			{...$constraints.email}
		/>
		{#if $errors.email}<small class="invalid">{$errors.email}</small>{/if}
	</label>
	<label for="password" class="label">
		<span>Parola</span>
		<input
			class="input"
			name="password"
			type="password"
			bind:value={$form.password}
			aria-invalid={$errors.password ? 'true' : undefined}
			{...$constraints.password}
		/>
		{#if $errors.password}<small class="invalid">{$errors.password}</small>{/if}
	</label>
	<button class="btn variant-filled-primary">Giriş yap</button>
	<!-- <button formaction="?/signup">Kayıt ol</button> -->
</form>

<SuperDebug data={$form} />

<style>
	.invalid {
		@apply text-red-500;
	}
</style>
