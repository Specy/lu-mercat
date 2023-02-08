<script lang="ts">
	import { cart } from '$stores/cart';
</script>

{#if $cart.length === 0}
	<h2>Cart is empty</h2>
{:else}
	{#each $cart as product}
		<div>
			{product.product.name}
		</div>
	{/each}
{/if}

<style lang="scss">
</style>
