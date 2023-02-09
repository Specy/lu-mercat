<script lang="ts">
	import { page } from '$app/stores';
	import { userStore } from '$stores/user';

	let user = userStore.findById($page.params.userId);
</script>

{#await user}
	<h1>Loading...</h1>
{:then user}
	{#if !user}
		<h1>User not found</h1>
	{:else}
		<h1>{user.username}</h1>
		<p>Role: {user.role}</p>
		<p>Id: {user.id}</p>
	{/if}
{/await}
