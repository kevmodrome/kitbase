<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { notifications } from '$lib/stores/notifications';
	import { enhance, applyAction } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
	const product = data.product;
	const categories = data.categories;

	let loading = false;

	const formResult: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					notifications.success('Updated product');
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

<main>
	<h2>Update Product</h2>
	<div class="sections">
		<section class="card">
			<h2>Update</h2>
			<form use:enhance={formResult} action="?/update" method="POST">
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
		</section>
		{#if data.user.role !== 'user'}
			<section class="card">
				<h2>Delete Product</h2>
				<form use:enhance action="?/delete" method="POST">
					<input hidden name="id" value={product.id} />
					<div class="right"><Button type="danger" disabled={loading}>Delete Product</Button></div>
				</form>
			</section>
		{/if}
	</div>
</main>

<style>
	main {
		padding: 0 var(--size-3);
	}
	.sections {
		padding: 0;
		margin: 0;
		display: grid;
		gap: var(--size-fluid-2);
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
		max-inline-size: 1100px;
	}
	.card {
		box-shadow: var(--shadow-1);
		background: var(--gray-8);
		border-radius: var(--radius-2);
		padding: var(--size-2) var(--size-3);
	}

	form {
		display: grid;
		margin: var(--size-3) 0;
		gap: var(--size-3);
	}

	.right {
		display: grid;
		width: 100%;
		place-content: end;
	}
</style>
