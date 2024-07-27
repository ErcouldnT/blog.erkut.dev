import { persisted } from 'svelte-persisted-store';

// First param `content` is the local storage key.
// Second param is the initial value.
export const contentHtml = persisted('content', '<h1>Başlık</h1>'); // new post content!
