<script lang="ts">
	import type { PageData } from './$types';
	import type { SubmitFunction } from '$app/forms';
	import { enhance, applyAction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { notifications } from '$lib/stores/notifications';
	import { afterNavigate, goto, invalidateAll } from '$app/navigation';

	export let loading = false;
	export let data: PageData;
	const product = data.product;
	const categories = data.categories;
	const [modals] = data.modals;

	const isEditing = modals === 'edit' ? true : false;

	afterNavigate(() => {
		invalidateAll();
	});

	const ariaLabel = isEditing ? 'Update Product Modal' : 'Confirm Delete Product Modal';
	const heading = isEditing ? 'Update' : 'Are you sure you want to delete this product?';

	const submit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					notifications.success(isEditing ? 'Product updated!' : 'Product Deleted');
					goto('/products');
					break;
				case 'error':
					notifications.danger('Something went wrong. Please try again.');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<Modal label={ariaLabel}>
	<h3 slot="heading">{heading}</h3>
	<form use:enhance={submit} action="/products?/{isEditing ? 'update' : 'delete'}" method="POST">
		<input hidden name="id" value={product.id} />
		{#if isEditing}
			<Input id="name" label="Name" type="text" value={product.name} disabled={loading} />
			<Input id="price" label="Price" type="number" value={product.price} disabled={loading} />
			<select name="category">
				<option value="" disabled>Select Category</option>
				{#each categories as { name, id }}
					<option value={id} selected={product?.categories?.includes(id)}>{name}</option>
				{/each}
			</select>
		{/if}
		<div class="right">
			<Button
				label={isEditing ? 'Update product button' : 'Confirm product deletion button'}
				type={isEditing ? 'success' : 'danger'}
				disabled={loading}>{isEditing ? 'Update Product' : 'Delete Product'}</Button
			>
		</div>
	</form>
</Modal>

<style>
	form {
		display: grid;
		gap: var(--size-2);
	}
</style>
