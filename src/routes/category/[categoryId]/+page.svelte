<script lang="ts">
	import { page } from '$app/stores';
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';
	import CategoryIcon from '$cmp/CategoryIcon.svelte';
	import Icon from '$cmp/layout/Icon.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import ProductRow from '$cmp/ProductRow.svelte';
	import { cart } from '$stores/cart';
	import { categoriesStore, type Product } from '$stores/products';
	import { toast } from '$stores/toastStore';

	let categoryId = $page.params.categoryId;
	$: categoryId = $page.params.categoryId;
	let products: Product[] = [];
	$: products = categoriesStore.getproductsOfCategory(categoryId);
	let category = categoriesStore.getCategoryById(categoryId);
	$: category = categoriesStore.getCategoryById(categoryId);
</script>

<svelte:head>
	<title>{category?.name ?? 'Category not found'}</title>
	<meta name="description" content={category?.description ?? 'Category not found'} />
</svelte:head>

<Page>
	{#if category}
		<div class="column" style="gap:0.5rem;">
			<div class="row" style="align-items: center; gap: 0.4rem; margin-bottom: 1rem">
				<Icon size={1.5}>
					<CategoryIcon category={category.imageUrl ?? ''} />
				</Icon>
				<h2>
					{category.name}
				</h2>
			</div>
			{#if products.length > 0}
				{#each products as product}
					<ProductRow
						{product}
						{categoryId}
						on:addToCart={() => {
							cart.addProductToCart({
								product: product,
								quantity: 1
							});
							toast.logPill(`Added ${product.name} to cart`);
						}}
					/>
				{/each}
			{:else}
				<div>No products found</div>
			{/if}
		</div>
	{:else}
		<div style="gap: 1rem" class="column">
			<h1>Category not found</h1>
			<ButtonLink href="/">Go to home</ButtonLink>
		</div>
	{/if}
</Page>

<style lang="scss">
</style>
