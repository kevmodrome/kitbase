<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Avatar from './Avatar.svelte';
	export let Hst: Hst;

	let url: string = 'https://i.pravatar.cc/300';
	let name: string = 'Jane Doe';
	let size: 'small' | 'medium' | 'large';
	const options = [
		{
			label: 'Large',
			value: 'large'
		},
		{
			label: 'Medium',
			value: 'medium'
		},
		{
			label: 'Small',
			value: 'small'
		}
	];
</script>

<Hst.Story>
	<Avatar large={size === 'large'} small={size === 'small'} {url} {name} />
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={name} title="Name" />
		<Hst.Text bind:value={url} title="Url" />
		<Hst.Radio title="Size" bind:value={size} {options} />
	</svelte:fragment>
</Hst.Story>
