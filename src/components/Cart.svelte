<script lang="ts">
	import { cart } from '$stores/cart';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import FaMinus from 'svelte-icons/fa/FaMinus.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ProductToOrder } from '$stores/orders';

	const dispatcher = createEventDispatcher<{
		increseQuantity: ProductToOrder;
		decreseQuantity: ProductToOrder;
	}>();
</script>

{#if $cart.length === 0}
	<h2>Cart is empty</h2>
{:else}
	{#each $cart as product}
		<div class="product row">
			<div>
				{product.product.name} ~ {product.product.price * product.quantity}€
			</div>
			<div class="row" style="align-items: center; gap: 0.3rem">
				{product.quantity}x
				<button
					class="quantity"
					style="background-color: var(--red); color: var(--red-text)"
					on:click={() => dispatcher('decreseQuantity', product)}
				>
					<FaMinus />
				</button>
				<button
					class="quantity"
					style="background-color: var(--green); color: var(--green-text"
					on:click={() => dispatcher('increseQuantity', product)}
				>
					<FaPlus />
				</button>
			</div>
		</div>
	{/each}
	<div class="row" style="justify-content: space-between; margin-top: 1rem">
		Estimated total:
		<div>
			{$cart.reduce((acc, product) => acc + product.product.price * product.quantity, 0)}€
		</div>
	</div>
	
{/if}

<style lang="scss">
	.product {
		justify-content: space-between;
		font-weight: 600;
		padding: 0.2rem;
	}
	.quantity {
		border: none;
		background-color: var(--primary);
		color: var(--primary-text);
		border-radius: 0.2rem;
		width: 1.6rem;
		padding: 0.3rem;
		height: 1.6rem;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
