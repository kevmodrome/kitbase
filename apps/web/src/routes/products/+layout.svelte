<script lang="ts">
	import type { PageData } from './$types';
	import Banner from '$lib/components/Banner.svelte';
	import Button from '$lib/components/Button.svelte';
	export let data: PageData;
</script>

<h1>Products</h1>
{#if data?.user?.profile?.role === 'admin'}
	<Banner />
{/if}
<div class="sections">
	<section class="card">
		<h2>Product List</h2>
		<ul>
			{#each data.products || [] as product}
				<li>
					{product.name}
					<span
						><ul>
							{#each product['@expand'].categories as { name }}
								<li>{name}</li>
							{/each}
						</ul>
						${product.price}</span
					>
					{#if data?.user?.profile?.role === 'admin'}
						<div class="actions">
							<Button label="Edit product" href="/products/{product.id}/edit" type="primary"
								>Edit</Button
							>
							<Button label="Delete product" href="/products/{product.id}/delete" type="danger"
								>Delete</Button
							>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
</div>

<slot />

<style lang="postcss">
	ul {
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

	.right {
		display: grid;
		width: 100%;
		place-content: end;
	}
</style>
