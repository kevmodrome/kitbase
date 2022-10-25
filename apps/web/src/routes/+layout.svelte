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
			<a data-sveltekit-prefetch href="/" aria-current={$currentPage === '/' && 'page'}
				>SVELTE SUMMIT</a
			>
		</li>
		<li>
			<a
				data-sveltekit-prefetch
				href="/login"
				aria-current={$currentPage.includes('/login') && 'page'}>Login</a
			>
		</li>
		<li>
			<a
				data-sveltekit-prefetch
				href="/account"
				aria-current={$currentPage.includes('/account') && 'page'}>Account</a
			>
		</li>
		<li>
			<a
				data-sveltekit-prefetch
				href="/products"
				aria-current={$currentPage.includes('/products') && 'page'}>Products</a
			>
		</li>
		{#if data?.user?.profile?.role && data?.user?.profile?.role !== 'user'}
			<li>
				<a
					data-sveltekit-prefetch
					href="/admin"
					aria-current={$currentPage.includes('/admin') && 'page'}>Admin</a
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

	[aria-current='page'] {
		color: green;
	}
</style>
