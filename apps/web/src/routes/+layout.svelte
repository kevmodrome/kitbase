<script lang="ts">
	import Toast from '$lib/components/Toast.svelte';
	import '../app.postcss';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<nav aria-label="primary-navigation">
	<ul>
		<li><a data-sveltekit-prefetch href="/">SVELTE SUMMIT</a></li>
		<li><a data-sveltekit-prefetch href="/login">Login</a></li>
		<li><a data-sveltekit-prefetch href="/account">Account</a></li>
		<li><a data-sveltekit-prefetch href="/products">Products</a></li>
		{#if data?.user?.profile?.role === 'admin'}
			<li><a data-sveltekit-prefetch href="/admin">Admin</a></li>
		{/if}
		<li><a href="/auth/signout">Sign out</a></li>
	</ul>
</nav>

<main><slot /></main>

<Toast />

<style>
	main {
		padding: 0 var(--size-3);
		display: grid;
		gap: var(--size-2);
	}
</style>
