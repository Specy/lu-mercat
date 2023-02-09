<script lang="ts">
	import { ordersStore } from '$stores/orders';
	import { page } from '$app/stores';
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';

	let order = ordersStore.findByOrderId($page.params.orderId);
</script>

{#if order}
	<h1>Order #{$page.params.orderId}</h1>
	<p>Order status: {order.status}</p>
	<p>Order items:</p>
	<ButtonLink href="/user/{order.id}">Visit user profile</ButtonLink>
	<ul>
		{#each order.products as item}
			<li>{item.product}, {item.quantity}x - {item.quantity * item.product.price}</li>
		{/each}
	</ul>
{:else}
	<h1>Order not found</h1>
{/if}
