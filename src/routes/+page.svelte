<script lang="ts">
	import Category from '$cmp/Category.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import { categories } from '$stores/products';
</script>

<Page>
	<h1>Categories</h1>
	<div class="categories">
        {#each $categories as category}
            <Category {category} />
        {/each}
    </div>
</Page>

<style lang="scss">

    .categories{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
</style>
