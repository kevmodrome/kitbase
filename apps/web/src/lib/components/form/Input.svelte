<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let id: string;
	export let label: string;
	export let type: string;
	export let disabled: boolean = false;
</script>

<div class="field">
	<label for={id}>{label}</label>
	<input {disabled} {id} name={id} {type} {value} {placeholder} />
</div>

<style lang="postcss">
	.field {
		display: grid;
		gap: var(--size-1);
	}

	input {
		background: var(--gray-2);
		color: var(--gray-9);

		&:disabled {
			color: var(--gray-9);
			background: var(--gray-6);
		}
	}
</style>
