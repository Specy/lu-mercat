<script lang="ts">
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';
	import Category from '$cmp/Category.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import { categoriesStore } from '$stores/products';
	import { userStore } from '$stores/user';
</script>

<Page>
	<div class="column" style="gap: 1rem">
		<h1>
			{#if $userStore}
				Welcome back, {$userStore.username}
			{:else}
				Welcome to the store
			{/if}
		</h1>
		<div class="categories">
			{#each $categoriesStore as category}
				<Category {category} />
			{/each}
		</div>
		<div class="column" style="margin-top: 1rem; gap: 1rem">
			{#if $userStore}
				<ButtonLink href="/orders">Orders</ButtonLink>
			{/if}
		</div>
	</div>
</Page>

<style lang="scss">
	.categories {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
</style>
