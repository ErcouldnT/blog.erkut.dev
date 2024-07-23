<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form class="flex flex-col space-y-4" method="POST" action="?/login" use:enhance>
	<label class="label">
		<span>Email</span>
		<input class="input" name="email" type="email" />
	</label>
	<label class="label">
		<span>Parola</span>
		<input class="input" name="password" type="password" />
	</label>
	<button class="btn variant-filled-primary">Giriş yap</button>
	<!-- <button formaction="?/signup">Sign up</button> -->
</form>
