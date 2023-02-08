<script lang="ts">
	import FaShoppingCart from 'svelte-icons/fa/FaShoppingCart.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import Button from './buttons/Button.svelte';
	import Cart from './Cart.svelte';
	import Icon from './layout/Icon.svelte';

	let cartVisible = false;
	const toggleCart = () => {
		cartVisible = !cartVisible;
	};
</script>

<nav class="nav">
	<div class="row" style="align-items: center; gap: 1rem;">
		<img src="/favicon.png" alt="favicon" class="favicon" />
		<a href="/"> Home </a>
	</div>
	<div class="cart">
		<Icon size={1.7} on:click={toggleCart}>
			{#if cartVisible}
				<FaTimes />
			{:else}
				<FaShoppingCart />
			{/if}
		</Icon>
	</div>
</nav>
<div class="floating-cart" class:cartVisible>
    <Cart />
</div>

<style lang="scss">
	.nav {
		position: fixed;
		width: 100vw;
		top: 0;
        height: 3rem;
		left: 0;
		justify-content: space-between;
		display: flex;
		align-items: center;
		background-color: rgba(var(--RGB-secondary), 0.8);
		padding: 0.5rem 1rem;
	}
	.favicon {
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 0.4rem;
	}
	.floating-cart {
		position: absolute;
		top: 3rem;
        height: calc(100% - 3rem);
        border-top: solid 0.1rem var(--tertiary);
        background-color: rgba(var(--RGB-secondary), 0.8);
		width: 80%;
        max-width: 30rem;
		right: 0;
		display: flex;
		transform: translateX(100%);
        transition: all 0.2s;
		align-items: center;
		gap: 1rem;
	}
	.cartVisible {
		transform: translateX(0);
        animation: forwards delayBlur 0.2s;
	}

    @keyframes delayBlur {
        0% {
            backdrop-filter: unset;
        }
        99% {   
            backdrop-filter: unset;
        }
        100% {
            backdrop-filter: blur(0.5rem);
        }
    }
</style>
