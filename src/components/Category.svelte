<script lang="ts">
	import type { Category } from '$stores/products';
	import CategoryIcon from './CategoryIcon.svelte';

	export let category: Category;
</script>

<a class="category" href="/category/{category.id}">
	<div class="category-icon">
		<CategoryIcon category={category.imageUrl ?? ''} />
	</div>
    <div>
        {category.name}
    </div>
</a>

<style lang="scss">
	.category {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 1rem;
		flex: 1;
		font-size: 1.2rem;
		min-height: 5rem;
		border-radius: 0.8rem;
		background-color: var(--primary);
		color: var(--primary-text);
		text-align: center;
		transition: all 0.2s;
		&:hover {
			transform: scale(0.98);
		}
	}

	.category-icon {
		width: 2rem;
		height: 2rem;
		margin-bottom: 0.5rem;
	}
</style>
