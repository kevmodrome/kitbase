<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Products</h1>
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
				</li>
			{/each}
		</ul>
	</section>
</div>

<!-- <form method="POST" action="/billing/checkout">
	<input hidden name="id" type="text" value="price_1LJ983IIyo8wu6Mj6eFA76j3" />
	<button>Test Checkout Stripe</button>
</form> -->
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
