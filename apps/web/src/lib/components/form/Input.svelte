<script lang="ts">
	import Field from './Field.svelte';
	export let value: string = '';
	export let placeholder: string = '';
	export let id: string;
	export let label: string;
	export let type: string;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let dark: boolean;
</script>

<Field>
	<label for={id}>{label}</label>
	<input {required} {disabled} {id} name={id} {type} {value} {placeholder} />
</Field>

<style lang="postcss">
	input {
		background: var(--gray-2);
		color: var(--gray-9);

		&:disabled {
			color: var(--gray-9);
			background: var(--gray-6);
		}
	}
</style>
