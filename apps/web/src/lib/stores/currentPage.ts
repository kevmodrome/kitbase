import { derived } from 'svelte/store';
import { page } from '$app/stores';

export const currentPage = derived(page, ($page) => {
    return $page.url.pathname;
});