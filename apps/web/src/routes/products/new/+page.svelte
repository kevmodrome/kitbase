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

	const submitNewProduct: SubmitFunction = () => {
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

<Modal label="Create new product modal">
	<h3 slot="heading">New Product</h3>
	<form use:enhance={submitNewProduct} action="/products?/create" method="POST">
		<Input required dark id="name" label="Name" type="text" disabled={loading} />
		<Input required dark id="price" label="Price" type="number" disabled={loading} />
		<select required id="category" name="category">
			<option value="" disabled>Select Category</option>
			{#each data.categories as { name, id }}
				<option value={id}>{name}</option>
			{/each}
		</select>
		<div class="right">
			<Button label="Create new product button" type="success" disabled={loading}
				>Create Product</Button
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
