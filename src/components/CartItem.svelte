<script lang="ts">
    import PriceInput from "./PriceInput.svelte";
    import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte'
	import type { ProductToOrder } from "$stores/orders";
	import { createEventDispatcher } from "svelte";
    export let item: ProductToOrder;
    let x = 0;
    let max = 100;
    let isDragging = false;
    let askingPrice = false;

    let price = item.product.price;
    function onLeave(e: any){
        e.preventDefault();
        isDragging = false;
        if(-x >= (max - 10) && !askingPrice){
            askingPrice = true
        }
        x = 0;
    }
    function clamp(x: number, min: number, max: number) {
        return Math.min(Math.max(x, min), max);
    }

    const dispatcher = createEventDispatcher<{setPrice: number}>()
</script>

{#if askingPrice}
    <PriceInput 
        bind:price
        basePrice={item.product.price}
        on:cancel={() => askingPrice = false}
        productName={item.product.name}
        on:setPrice={(e) => {
            dispatcher("setPrice", e.detail)
            askingPrice = false
        }}
    />
{/if}

<div class="cart-item"
    class:checkedOut={item.finalPrice}
    on:pointerdown={(e) => {
        max = e.currentTarget.clientWidth / 3;
        e.preventDefault();
        isDragging = true;
    }}
    on:pointerleave={onLeave}
    on:pointerup={onLeave}
    on:pointermove={(e) => {
        if (!isDragging) return;
        e.preventDefault();
        x = clamp(x + e.movementX, -max, 0)
    }}
>
    <div 
        class="draggable"
        class:isDragging
        style="transform: translateX({clamp(x, -max, max)}px)"
    >
        <div class="name" >
            x{item.quantity} - {item.product.name} 
        </div>
        <div class="icon">
            <FaArrowLeft />
        </div>
    </div>
    <div
        class="bg"
        class:isDragging
        class:left={x < 0}
    >
        Confirm
    </div>
</div>


<style lang="scss">
    .draggable{
        position: absolute;
        transition: all 0.2s ease-in-out;
        justify-content: space-between;
        display: flex;
        align-items: center;
        padding: 0.8rem 1rem;    
        padding-left: 1.4rem;
        touch-action: none;
        background-color: var(--secondary);
        width: 100%;
        height: 100%;
        z-index: 10;
        top: 0;
        left: 0;
         &.isDragging{
            filter: brightness(0.95);
            transition: none;
        }
    }
    .icon{
        width: 1rem;
        height: 1rem;

    }
    .cart-item{
        border: solid 0.2rem transparent;
        display: flex;
        position: relative;
        height: 4rem;
        overflow: hidden;
        width: 100%;
        border-radius: 0.8rem;
    }
    .checkedOut{
        border-color: green;
    }
    .bg{
        position: absolute;
        display: flex;
        align-items: center;
        padding: 0.8rem;
        width: 100%;
        height: 100%;
        top: 0;
        transition: all 0.4s ease-in-out;
        left: 0;
        &.isDragging{
            transition: none;
        }
    }
    .left{
        background-color: rgb(74, 142, 74);
        color: white;
        justify-content: flex-end;
        
    }   
</style>