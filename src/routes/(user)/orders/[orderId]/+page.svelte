<script lang="ts">
	import { ordersStore, OrderStatus } from '$stores/orders';
	import { page } from '$app/stores';
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';
	import CartItem from '$cmp/CartItem.svelte';
	import Button from '$cmp/buttons/Button.svelte';
	import { userStore } from '$stores/userStore';
	import Page from '$cmp/layout/Page.svelte';
	import { Prompt } from '$stores/promptStore';
	import { toast } from '$stores/toastStore';

	let order = ordersStore.findByOrderId($page.params.orderId);
</script>

<Page>
	<div class="column content">
		{#if order}
			<div class="row" style="gap: 1rem; align-items: center">
				<ButtonLink href="/user/{order.userId}">Visit user profile</ButtonLink>
				{order.status}
			</div>
			<div class="column checklist">
				{#each order.products as item}
					<CartItem
						{item}
						on:setPrice={(e) => {
							ordersStore.confimProdultPriceInOrder(order, item, e.detail);
						}}
					/>
				{/each}
			</div>
			<div class="row" style="justify-content: flex-end; width:100%; font-size: 1.2rem">
				<div>
					Total: {order.products.reduce(
						(acc, item) => acc + (item.finalPrice || item.product.price) * item.quantity,
						0
					)}€
				</div>
			</div>
			<Button
				on:click={async () => {
					if (!order) return;
					const price = order.products.reduce(
						(acc, item) => acc + (item.finalPrice || item.product.price) * item.quantity,
						0
					);
					const confirm = await Prompt.askText(
						`What's the total price? \n Estimated: ${price}`,
						false,
						`${price}`
					);
					if (!confirm) return;
					if (Number.isNaN(Number(confirm))) return toast.error('Invalid price');
					order.finalPrice = Number(confirm);
					console.log(order, confirm);
					order = await ordersStore.setOrderBought(order, $userStore);
					toast.success('Order confirmed');
				}}
				cssVar="accent2"
				style="width: 100%; font-weight: bold; height: 3rem "
				>{order.status === OrderStatus.Bought ? 'Update order' : 'Confirm order'}</Button
			>
		{:else}
			<h1>Order not found</h1>
		{/if}
	</div>
</Page>

<style lang="scss">
	.content {
		gap: 1rem;
	}
	.checklist {
		gap: 0.5rem;
		border-radius: 0.8rem;
	}
</style>
