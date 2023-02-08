<script lang="ts">
	import { page } from '$app/stores';
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import { categoriesStore } from '$stores/products';

	let categoryId = $page.params.categoryId;
	let products = [];
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
		<div class="column">
			<h2>
				{category.name}
			</h2>
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
