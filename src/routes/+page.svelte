<script lang="ts">
	import Category from '$cmp/Category.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import { categoriesStore } from '$stores/products';
</script>

<Page>
	<h1 style="margin-bottom: 2rem;">Categories</h1>
	<div class="categories">
        {#each $categoriesStore as category}
            <Category {category} />
        {/each}
    </div>
</Page>

<style lang="scss">

    .categories{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
</style>
