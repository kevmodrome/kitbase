<script lang="ts">
	export let type: 'success' | 'danger' | 'warning' | 'primary' | 'secondary' = 'primary';
	export let disabled: boolean = false;
	export let href: string = '';
</script>

<svelte:element this={href ? 'a' : 'button'} {disabled} {href} class="button {type}"
	><slot /></svelte:element
>

<style lang="postcss">
	.button {
		color: var(--gray-2);
		display: grid;
		place-items: center;
		padding: var(--size-2) var(--size-3);
		margin: 0;
		min-height: var(--size-7);
		background: var(--gray-7);
		border-radius: var(--radius-2);
		cursor: pointer;

		&:hover {
			filter: brightness(1.1);
			text-decoration: none;
		}

		&:disabled {
			filter: brightness(0.8);
			cursor: wait;
		}
	}

	.success {
		background: var(--green-7);
	}
	.danger {
		background: var(--red-7);
	}
	.warning {
		background: var(--orange-7);
	}
	.primary {
		background: var(--pink-7);
	}
	.secondary {
		background: var(--indigo-9);
	}
</style>
