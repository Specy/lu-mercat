<script lang="ts">
    import FaAppleAlt from 'svelte-icons/fa/FaAppleAlt.svelte'
    import FaBacon from 'svelte-icons/fa/FaBacon.svelte'
    import FaBreadSlice from 'svelte-icons/fa/FaBreadSlice.svelte'
    import FaCheese from 'svelte-icons/fa/FaCheese.svelte'
    import FaWineBottle from 'svelte-icons/fa/FaWineBottle.svelte'
    import FaHome from 'svelte-icons/fa/FaHome.svelte'
    export let category: string 
</script>

{#if category === 'apple'}
    <FaAppleAlt />
{:else if category === 'bacon'}
    <FaBacon />
{:else if category === 'bread'}
    <FaBreadSlice />
{:else if category === 'cheese'}
    <FaCheese />
{:else if category === 'bottle'}
    <FaWineBottle />
{:else if category === 'home'}
    <FaHome />
{/if}