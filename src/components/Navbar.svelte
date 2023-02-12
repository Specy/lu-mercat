<script lang="ts">
	import { cart } from '$stores/cart';
	import { ordersStore } from '$stores/orders';
	import { toast } from '$stores/toastStore';
	import { UserRole, userStore, type User } from '$stores/userStore';
	import { onMount } from 'svelte';
	import FaShoppingCart from 'svelte-icons/fa/FaShoppingCart.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import Button from './buttons/Button.svelte';
	import ButtonLink from './buttons/ButtonLink.svelte';
	import Cart from './Cart.svelte';
	import Icon from './layout/Icon.svelte';

	let users: User[] = [];
	let destinationUser = $userStore;
	$: destinationUser = $userStore;

	onMount(async () => {
		users = await userStore.getAllConsumers();
	});
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
<div
	class="cart-overlay"
	class:cart-overlay-visible={cartVisible}
	on:click={() => (cartVisible = false)}
/>
<div class="floating-cart" class:cartVisible>
	<h2>Your cart</h2>
	<div
		style="background-color: var(--primary); color: var(--primary-text); padding: 0.8rem; border-radius: 0.4rem"
	>
		<Cart
			on:decreseQuantity={(e) => {
				const product = e.detail;
				cart.reduceProductToCart({
					...product,
					quantity: 1
				});
			}}
			on:increseQuantity={(e) => {
				const product = e.detail;
				cart.addProductToCart({
					...product,
					quantity: 1
				});
			}}
		/>
	</div>
	{#if $userStore?.role === UserRole.Delegate}
		<div
			class="column"
			style="border-radius: 0.4rem; background-color: var(--secondary); color: var(--secondary-text); padding: 0.8rem; gap: 0.8rem;"
		>
			<div>Select user to place order for</div>
			<select
				class="user-select"
				value={destinationUser?.id}
				on:change={(e) => {
					destinationUser = users.find((user) => user.id === e.target.value) ?? $userStore;
				}}
			>
				<option value={$userStore.id}>
					{$userStore.username}
				</option>
				{#each users as user}
					<option value={user.id}>{user.username}</option>
				{/each}
			</select>
		</div>
	{/if}
	<div class="row" style="justify-content: center; width: 100%;">
		{#if $userStore !== null && $cart.length > 0}
			<Button
				style="width: 100%"
				on:click={() => {
					ordersStore.placeOrder(destinationUser?.id ?? $userStore.id, $userStore.id, $cart);
					cart.resetCart();
					toast.success('Order placed successfully');
				}}
			>
				Checkout
			</Button>
		{:else if $cart.length > 0}
			<ButtonLink
				href="/login"
				style="width: 100%"
				on:click={() => {
					cartVisible = false;
				}}
			>
				Login to checkout
			</ButtonLink>
		{:else}{/if}
	</div>
	{#if $userStore}
		<Button
			style="width: 100%; margin-top: auto"
			on:click={() => {
				userStore.logout();
			}}
		>
			Logout
		</Button>
	{:else}
		<ButtonLink
			on:click={() => {
				cartVisible = false;
			}}
			href="/login"
			style="width: 100%;  margin-top: auto">Login</ButtonLink
		>
	{/if}
</div>

<style lang="scss">
	.nav {
		position: sticky;
		width: 100vw;
		top: 0;
		height: 3rem;
		left: 0;
		justify-content: space-between;
		display: flex;
		z-index: 10;
		align-items: center;
		backdrop-filter: blur(0.4rem);
		background-color: rgba(var(--RGB-secondary), 0.8);
		padding: 0.5rem 1rem;
	}
	.cart-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(0.2rem);
		opacity: 0;
		visibility: hidden;
		transition: all 0.2s;
		pointer-events: none;
	}
	.cart-overlay-visible {
		opacity: 1;
		visibility: visible;
		pointer-events: all;
	}
	.user-select {
		width: 100%;
		height: 2.5rem;
		border-radius: 0.4rem;
		border: none;
		padding: 0.5rem;
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
		width: 100%;
		max-width: 30rem;
		right: 0;
		display: flex;
		transform: translateX(100%);
		transition: all 0.2s;
		gap: 1rem;
		z-index: 10;
		padding: 1rem;
		flex-direction: column;
		gap: 1rem;
	}
	.cartVisible {
		transform: translateX(0);
	}
</style>
