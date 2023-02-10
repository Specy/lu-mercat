<script lang="ts">
	import { ordersStore } from '$stores/orders';
	import OrderPreview from '$cmp/OrderPreview.svelte';
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
	$: console.log($ordersStore);

</script>

<Page>
	{#if $ordersStore.length === 0}
		<div class="column" style="gap: 1rem; align-items: center">
			<p>There are no orders yet</p>
			<ButtonLink href="/">Go back</ButtonLink>
		</div>
	{/if}
	<div class="column" style="gap: 0.8rem">
		{#each $ordersStore as order}
			<OrderPreview {order} user={data.props.user} />
		{/each}
	</div>
</Page>
