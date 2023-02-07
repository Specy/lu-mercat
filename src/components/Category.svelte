<script lang="ts">
	import type { Category } from "$stores/products";

    export let category: Category
</script>

<a 
    class="category"
    href="/category/{category.id}"
>
    {category.name}
</a>


<style lang="scss">
    .category{
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        max-width: 20rem;
        padding: 1.8rem;
        border-radius: 0.8rem;
        background-color: var(--primary);
        color: var(--primary-text);
    }


</style>

