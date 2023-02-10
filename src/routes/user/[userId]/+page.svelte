<script lang="ts">
	import { page } from '$app/stores';
	import Page from '$cmp/layout/Page.svelte';
	import { userStore, type User } from '$stores/userStore';
	import { onMount } from 'svelte';

	let user: User | null = null;
	onMount(async () => {
		const id = $page.params.userId;
		user = await userStore.findById(id) ?? null;
	})
</script>

<Page>
	{#if !user}
	<h1>User not found</h1>
{:else}
	<div class="column content">
		<h1>{user.username} - {user.role}</h1>
		<div class="address">
			{user.address}
		</div>
	</div>
{/if}

</Page>

<style lang="scss">
    .address{
        padding: 1rem;
        border-radius: 0.4rem;
        color: var(--secondary-text);
        background-color: var(--secondary);
    }

	.content{
		gap: 1rem
	}
</style>
