<script>
	import { currentPage } from '$lib/stores/currentPage';
</script>

<nav aria-label="admin-navigation">
	<ul>
		<li><a href="/admin" aria-current={$currentPage === '/admin' && 'page'}>Dashboard</a></li>
		<li>
			<a href="/admin/users" aria-current={$currentPage.includes('/users' && 'page')}>Users</a>
		</li>
	</ul>
</nav>
<h1>Admin</h1>
<slot />

<style>
	[aria-current='page'] {
		color: green;
	}
</style>
