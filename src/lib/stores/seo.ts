import { writable } from 'svelte/store';
import project from '$lib/config/project';

export const seo = writable({
	title: project.title,
	description: project.description
});
