<script lang="ts">
	import { fade, fly } from "svelte/transition";


    export let animate = true
</script>




<div 
    class="page"
    out:fade={{ duration: 100 }}
    in:fly={{ duration: 150, y: -30, delay: 100 }}
>
    <div class="content">
        <slot />
    </div>
</div>



<style lang="scss">
    .page, .content{
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-top: 2rem;
    }
    .page{
        align-items: center;
        padding: 1rem;
    }
    .content{
        width: 100%;
        max-width: 60rem;
    }
</style>