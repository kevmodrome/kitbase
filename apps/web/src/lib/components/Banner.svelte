<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import NewIcon from 'virtual:icons/ant-design/file-add-outlined';
	import CloseIcon from 'virtual:icons/ant-design/close-circle-outlined';
</script>

<dialog open>
	<div class="text">
		<h3>Create new Product</h3>
		<p>Create a new product by clicking the button on the right.</p>
	</div>
	<div class="actions">
		<Button href="/products/new" label="Create new product" type="success"
			><NewIcon style="font-size:1.5em; color: var(--gray-2);" /></Button
		>
		<form method="dialog">
			<Button label="Close admin info banner" type="danger"
				><CloseIcon style="font-size:1.5em; color: var(--gray-2);" /></Button
			>
		</form>
	</div>
</dialog>

<style lang="postcss">
	dialog[open] {
		all: unset;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: var(--size-3);
		background: var(--gray-8);
		border: var(--border-size-1) solid var(--gray-5);
		color: var(--gray-2);
		padding: var(--size-2);
		border-radius: var(--radius-2);
		font-size: var(--font-size-0);
		min-height: var(--size-8);
	}

	h3 {
		font-size: var(--font-size-fluid-0);
		font-weight: var(--font-weight-6);
	}

	p {
		font-size: var(--font-size-fluid-0);
	}

	.actions {
		display: flex;
		gap: var(--size-2);
	}

	button {
		background: var(--blue-7);
		padding: var(--size-1);
		border-radius: var(--radius-round);

		&:hover {
			background: var(--blue-5);
		}
	}

	form {
		padding: none;
	}
</style>
