<script lang="ts">
	import type { Product } from "$stores/products"
	import { createEventDispatcher } from "svelte"
    import FaCartPlus from 'svelte-icons/fa/FaCartPlus.svelte'
	import Button from "./buttons/Button.svelte";
	import Icon from "./layout/Icon.svelte";
    Icon
    Button
    const dispatcher = createEventDispatcher<{
        addToCart: Product
    }>()
    export let product: Product
</script>


<div class="product">
    <div>
        {product.name}
    </div>
    <div class="row" style="gap: 0.5rem; align-items: center">
        ~{product.price}€
        
        <Button hasIcon on:click={() => dispatcher("addToCart")}>
            <Icon>
                <FaCartPlus />
            </Icon>
        </Button>
    </div>
</div>


<style lang="scss">
    .product{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        font-size: 1.1rem;

        background-color: var(--primary);
        color: var(--primary-text);
        padding: 0.6rem;
        padding-left: 1.2rem;
        border-radius: 0.6rem;
    }
</style>