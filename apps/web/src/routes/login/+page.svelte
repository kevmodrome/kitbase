<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ul>
	{#each data.methods || [] as { authUrl, name }}
		<li>
			<a href={authUrl}>{name}</a>
		</li>
	{/each}
</ul>
