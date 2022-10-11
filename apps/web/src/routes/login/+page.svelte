<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import GitHub from './github.svg';
	export let data: PageData;

	const socialMediaIcons = new Map([['github', GitHub]]);
</script>

<ul>
	{#each data.methods || [] as { authUrl, name }}
		<li>
			<Button href={authUrl}
				><img src={socialMediaIcons.get('github')} alt="{name} logo" />{name}</Button
			>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
	}
</style>
