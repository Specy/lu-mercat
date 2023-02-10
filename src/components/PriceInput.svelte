
<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
    let el:HTMLInputElement
    export let price: number | undefined
    export let basePrice: number | undefined
    const dispatcher = createEventDispatcher<{setPrice: number, cancel: void}>()
    onMount(() => {
        el.focus()
    })
    export let productName: string
</script>


<div class="overlay"
    in:fly={{y: -20}}
    out:fly={{y: -20}}
>
    <form class="content"
        on:submit={(e) => {
            e.preventDefault()
            if(!(basePrice === undefined ? price <= 0 : false)){
                dispatcher("setPrice", basePrice ?? price ?? 0)
            }
        }}
    >
        What's the price of one "{productName}"?
        <input 
            type="number"
            placeholder={basePrice === undefined ? "New item" : basePrice.toString()}
            bind:value={price}
            class="price-input"
            bind:this={el}
        />
        <div class="row">
            <button
                on:click={() => dispatcher("cancel")}
                class="button"
                style="background-color: transparent; color: var(--primary-text"
            >
                Cancel
            </button>
            <button
                on:click={() => dispatcher("setPrice", basePrice ?? price ?? 0)}
                disabled={basePrice === undefined ? price <= 0 : false}
                class="button"
                style="background-color: var(--accent2); font-weight: bold; color: white;"
            >
                Ok
            </button>
        </div>
    </form>
</div>



<style lang="scss">
    .row{
        display: flex;
        justify-content: space-between;
    }
    .button{
        background-color: red;
        border: none;
        flex: 1;
        max-width: 7rem;
        padding: 0.6rem 1rem;
    
        border-radius: 0.4rem;
        &:disabled{
            opacity: 0.8;
        }
    }
    .overlay{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        backdrop-filter: blur(3px);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20vh;
    }
    .price-input{
        height: 2.5rem;
        padding: 0.4rem 1rem;
        border-radius: 0.3rem;
        border: solid 2px #666;
    }
    .content{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: calc(100% - 2rem);
        padding: 1rem;
        border-radius: 1rem;
        background-color:var(--primary);
        color: var(--primary-text);
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        max-width: 30rem;
    }
</style>