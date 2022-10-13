<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	export let label: string;
</script>

<a aria-label="Close modal" href="/products" class="backdrop" transition:fade />
<div
	transition:fly
	id="dialog_layer"
	class="dialogs"
	role="dialog"
	aria-labelledby={label}
	aria-modal="true"
>
	<div class="heading">
		<slot name="heading" />
	</div>
	<div class="content">
		<slot />
	</div>
	<div class="actions">
		<slot name="actions" />
	</div>
</div>

<style lang="postcss">
	[role='alertdialog'],
	[role='dialog'] {
		display: grid;
		grid-template-rows: auto 1fr auto;
		padding: var(--size-2) var(--size-3);
		border: var(--border-size-2) solid var(--gray-2);
		border-radius: var(--radius-2);
		background-color: var(--gray-9);
		color: var(--gray-8);
		min-height: 100vh;
	}

	@media screen and (min-width: 640px) {
		[role='alertdialog'],
		[role='dialog'] {
			position: absolute;
			top: 2rem;
			left: 50vw; /* move to the middle of the screen (assumes relative parent is the body/viewport) */
			transform: translateX(-50%); /* move backwards 50% of this element's width */
			box-shadow: var(--shadow-3);
			min-width: calc(640px - (15px * 2)); /* == breakpoint - left+right margin */
			min-height: auto;
		}
	}

	.backdrop {
		padding: 0;
		margin: 0;
		position: absolute;
		opacity: 0.7;
		background: var(--gray-9);
		inset: 0;
		cursor: unset;
	}
</style>
