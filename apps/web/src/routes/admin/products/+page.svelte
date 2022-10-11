<script lang="ts">
	import { Variant } from '$lib/types';
	import type { ActionData, PageData } from './$types';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { notifications } from '$lib/stores/notifications';
	export let data: PageData;
	export let form: ActionData;

	$: if (form?.result) notifications.success('Created new product');

	export let loading = false;

	const formResult = ({ form }) => {
		loading = true;
		return async ({ result, data }) => {
			switch (result.type) {
				case 'success':
					notifications.success('Created new product');
					form.reset();
					invalidateAll();
					break;
				case 'error':
					notifications.danger('Something went wrong when trying to create a new product');
					break;
				default:
					form.reset();
					invalidateAll();
					await applyAction(result);
			}
			loading = false;
		};
	};
	const deleteProduct = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					notifications.success('Product Deleted');
					invalidateAll();
					break;
				case 'error':
					notifications.danger('Something went wrong when trying to delete the product');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<h2>Products & Categories</h2>
<main>
	<div class="sections">
		<section class="card">
			<h3>Product List</h3>
			<table>
				<thead />
				<tbody>
					{#each data.products as { name, price, id, categories }}
						<tr>
							<td>{name}</td>
							<td>{price}</td>
							<td>
								<ul>
									{#each categories as category}
										<li><Badge variant={Variant.Success}>{category.name}</Badge></li>
									{/each}
								</ul>
							</td>
							<td><Button href="/admin/products/{id}">Edit</Button></td>
							<td
								><form use:enhance={deleteProduct} action="?/delete" method="POST">
									<input name="id" value={id} hidden />
									<Button type="danger">Delete</Button>
								</form></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>
		<section class="card">
			<h3>New Product</h3>
			<form use:enhance={formResult} action="?/create" method="POST">
				<Input id="name" label="Name" type="text" disabled={loading} />
				<Input id="price" label="Price" type="number" disabled={loading} />
				<select name="category">
					<option value="" disabled>Select Category</option>
					{#each data.categories as { name, id }}
						<option value={id}>{name}</option>
					{/each}
				</select>
				<div class="right"><Button type="success" disabled={loading}>Create Product</Button></div>
			</form>
		</section>
		<section class="card">
			<h3>Category List</h3>
			<ul>
				{#each data.categories || [] as { name }}
					<li>
						{name}
					</li>
				{/each}
			</ul>
		</section>
		<section class="card">
			<h3>Create Category</h3>
			<form use:enhance action="?/createCategory" method="POST">
				<Input id="name" label="Name" type="text" disabled={loading} />
				<div class="right"><Button type="success" disabled={loading}>Create Category</Button></div>
			</form>
		</section>
	</div>
</main>

<!-- <form method="POST" action="/billing/checkout">
	<input hidden name="id" type="text" value="price_1LJ983IIyo8wu6Mj6eFA76j3" />
	<button>Test Checkout Stripe</button>
</form> -->
<style lang="postcss">
	ul {
		display: grid;
		padding: 0;
		margin: 0;
	}
	li {
		display: flex;
		padding: var(--size-2);
		justify-content: space-between;
		place-items: center;
		gap: var(--size-2);

		&:nth-child(even) {
			background: var(--gray-9);
		}
	}

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

	.actions {
		display: flex;
		gap: var(--size-2);
	}
	.card {
		box-shadow: var(--shadow-1);
		background: var(--gray-8);
		border-radius: var(--radius-2);
		padding: var(--size-2) var(--size-3);
	}

	form {
		display: grid;
		gap: var(--size-3);
	}

	.right {
		display: grid;
		width: 100%;
		place-content: end;
	}
</style>
