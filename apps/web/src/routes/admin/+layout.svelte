<script>
	import { currentPage } from '$lib/stores/currentPage';
</script>

<nav aria-label="admin-navigation">
	<ul>
		<li><a href="/admin" class:active={$currentPage === '/admin'}>Dashboard</a></li>
		<li><a href="/admin/users" class:active={$currentPage.includes('/users')}>Users</a></li>
	</ul>
</nav>
<h1>Admin</h1>
<slot />

<style>
	.active {
		color: green;
	}
</style>
