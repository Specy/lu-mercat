<script lang="ts">
	import type { Product } from "$stores/products"
	import { createEventDispatcher } from "svelte"


    const dispatcher = createEventDispatcher<{
        addToCart: Product
    }>()
    export let product: Product
</script>


<style lang="scss">

</style>