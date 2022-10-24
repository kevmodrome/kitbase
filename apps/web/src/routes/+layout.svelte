<script lang="ts">
	import { currentPage } from '$lib/stores/currentPage';
	import Toast from '$lib/components/Toast.svelte';
	import '../app.postcss';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<nav aria-label="primary-navigation">
	<ul>
		<li>
			<a data-sveltekit-prefetch href="/" class:active={$currentPage === '/'}>SVELTE SUMMIT</a>
		</li>
		<li>
			<a data-sveltekit-prefetch href="/login" class:active={$currentPage.includes('/login')}
				>Login</a
			>
		</li>
		<li>
			<a data-sveltekit-prefetch href="/account" class:active={$currentPage.includes('/account')}
				>Account</a
			>
		</li>
		<li>
			<a data-sveltekit-prefetch href="/products" class:active={$currentPage.includes('/products')}
				>Products</a
			>
		</li>
		{#if data?.user?.profile?.role && data?.user?.profile?.role !== 'user'}
			<li>
				<a data-sveltekit-prefetch href="/admin" class:active={$currentPage.includes('/admin')}
					>Admin</a
				>
			</li>
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

	.active {
		color: green;
	}
</style>
