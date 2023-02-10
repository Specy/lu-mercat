<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$cmp/buttons/Button.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import { cart } from '$stores/cart';
	import { productsStore } from '$stores/products';
	import { toast } from '$stores/toastStore';

	let product = productsStore.getById($page.params.productId);
</script>

<Page>
	<div class="content column">
		{#if product}
			<h1 style="margin-bottom: 1rem">{product.name} ~ {product.price}€</h1>
			<div class="description">
				{product.description}
			</div>
			<div class="row" style="" />
			<Button
				style="width: 100%; margin-top: auto"
				on:click={() => {
					cart.addProductToCart({
						product,
						quantity: 1,
						finalPrice: 0,
					});
					toast.logPill(`Added ${product?.name} to cart`);
				}}
			>
				Add to cart
			</Button>
		{:else}
			<h1>Product not found</h1>
		{/if}
	</div>
</Page>

<style lang="scss">
	.content {
		gap: 1rem;
        height: 100%;
	}

    .description{
        padding: 1rem;
        border-radius: 0.4rem;
        color: var(--secondary-text);
        background-color: var(--secondary);
    }
</style>
