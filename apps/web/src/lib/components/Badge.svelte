<script lang="ts">
	import { Variant } from '$lib/types';
	export let variant: Variant = Variant.Default;
	export let outline: boolean = false;
</script>

<span class={variant} class:outline><slot /></span>

<style lang="postcss">
	span {
		--_color-accent: var(--badge-color, var(--gray-9));
		--_color-text: var(--badge-text-color, var(--gray-0));
		border: none;
		border-radius: var(--radius-round);
		padding: var(--size-1) var(--size-2);
		font-size: var(--font-size-0);

		background: var(--_color-accent);
		color: var(--_color-text);

		&:hover {
			filter: brightness(1.1);
		}
	}
	.outline {
		border: 1px solid var(--_color-accent);
		background: none;
		--_color-text: var(--_color-accent);
	}

	.default {
		--_color-accent: var(--gray-8);
		--_color-text: var(--gray-2);
	}

	.danger {
		--_color-accent: var(--red-8);
		--_color-text: var(--gray-0);
	}
	.warning {
		--_color-accent: var(--yellow-9);
		--_color-text: var(--gray-0);
	}
	.success {
		--_color-accent: var(--green-6);
		--_color-text: var(--gray-0);
	}
</style>
