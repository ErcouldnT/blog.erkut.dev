import { persisted } from 'svelte-persisted-store';

// First param `post` is the local storage key.
// Second param is the initial value.
export const post = persisted(
	'post',
	'<h1>Başlık</h1><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
); // new post!
