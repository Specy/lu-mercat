<script lang="ts">
	import { ordersStore, OrderStatus, type Order } from '$stores/orders';
	import { UserRole, userStore, type User } from '$stores/user';
	import { onMount } from 'svelte';
	import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
	import Button from './buttons/Button.svelte';
	import Icon from './layout/Icon.svelte';
	export let user: User;
	export let order: Order;
	let productsVisible = false;
	let orderer: User | null = null;
	let receiver: User | null = null;
	onMount(async () => {
		orderer = (await userStore.findById(order.ordererId)) ?? null;
		receiver = (await userStore.findById(order.userId)) ?? null;
	});
</script>

<div class="column order">
	<div class="row" style="justify-content: space-between; align-items: center">
		<h3 style="height: min-content">
			{#if order.userId !== user.id}
				{#if orderer && receiver}
					{#if orderer !== receiver}
						{orderer.id === user.id ? 'You' : orderer.username} ordered for {receiver.username}
					{:else}
						{orderer.username}
					{/if}
				{/if}
			{:else}
				Your order
			{/if}
		</h3>
		<div class="status">
			{order.status}
		</div>
	</div>
	<div
		on:click={() => (productsVisible = !productsVisible)}
		class="row"
		style="align-items: center; justify-content: space-between; border-top: 0.1rem solid var(--primary-text); margin-top: 0.6rem; padding-top: 0.6rem"
	>
		<h2>
			{order.products.length} products
		</h2>
		<Icon>
			<FaChevronDown />
		</Icon>
	</div>

	<div class="column" style="padding: 0.4rem; gap: 0.3rem">
		{#if productsVisible}
			{#each order.products as product}
				<div class="row" style="justify-content: space-between;">
					<div>
						{product.product.name} - x{product.quantity}
					</div>
					<div>
						{product.product.price * product.quantity}€
					</div>
				</div>
			{/each}
		{/if}
	</div>
	<div class="row" style="justify-content: space-between; margin-top: 1rem">
		<div>Total</div>
		<div>
			{order.products.reduce((acc, product) => {
				return acc + product.product.price * product.quantity;
			}, 0)}€
		</div>
	</div>
	{#if user.role === UserRole.Appointee}
        <div style="margin-top: 1rem;">
            {#if order.status === OrderStatus.Pending}
			<Button
				on:click={() => {
					ordersStore.acceptOrderByDeliverator(order, user);
				}}
			>
				Accept
			</Button>
		{:else if order.status === OrderStatus.Accepted}
			<Button
				on:click={() => {
					ordersStore.setOrderStatus(order.id, OrderStatus.Delivered);
				}}
			>
				Set as delivered
			</Button>
		{:else if order.status === OrderStatus.Delivered}
			Delivered
		{/if}
        </div>
	{/if}
</div>

<style lang="scss">
	.order {
		width: 100%;
		max-width: 40rem;
		border-radius: 1rem;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		background-color: var(--primary);
		color: var(--primary-text);
		padding: 1rem;
	}
	.status {
		padding: 0.5rem;
		border-radius: 0.5rem;
		background-color: var(--accent);
		color: var(--accent-text);
	}
</style>
