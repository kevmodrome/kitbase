<script lang="ts">
	import type { PageData } from './$types';
	import type { SubmitFunction } from '$app/forms';
	import { enhance, applyAction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { notifications } from '$lib/stores/notifications';
	import { goto, invalidateAll } from '$app/navigation';

	export let loading = false;
	export let data: PageData;
	const product = data.product;
	const categories = data.categories;

	const updateProduct: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					notifications.success('Updated product');
					await invalidateAll();
					goto('/products');
					break;
				case 'error':
					notifications.danger('Something went wrong when trying to update the product');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<Modal label="Update Product Modal">
	<h3 slot="heading">Update</h3>
	<form use:enhance={updateProduct} action="/products?/update" method="POST">
		<input hidden name="id" value={product.id} />
		<Input id="name" label="Name" type="text" value={product.name} disabled={loading} />
		<Input id="price" label="Price" type="number" value={product.price} disabled={loading} />
		<select name="category">
			<option value="" disabled>Select Category</option>
			{#each categories as { name, id }}
				<option value={id} selected={product.categories.includes(id)}>{name}</option>
			{/each}
		</select>
		<div class="right"><Button type="success" disabled={loading}>Update Product</Button></div>
	</form>
</Modal>

<style>
	form {
		display: grid;
		gap: var(--size-2);
	}
</style>
