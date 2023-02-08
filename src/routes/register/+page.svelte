<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$cmp/buttons/Button.svelte';
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';
	import Input from '$cmp/inputs/Input.svelte';
	import Select from '$cmp/inputs/Select.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import { toast } from '$stores/toastStore';
	import { UserRole, userStore } from '$stores/user';
	let username = '';
	let password = '';
	let role = UserRole.Customer;
</script>

<Page>
	<div class="content">
		<h1>Register</h1>
		<div class="form">
			<Input bind:value={username} placeholder="Username" />
			<Input bind:value={password} placeholder="Password" type="password" />
			<Select bind:value={role} options={Object.values(UserRole)} />
			<Button
				style="width: 100%; margin-top: 1rem"
				on:click={() => {
					try {
						userStore.register(username, password, role);
					} catch (e) {
						return toast.error('Error registering');
					}
					toast.success('Registered successfully');
					goto('/login');
				}}
			>
				Register
			</Button>
		</div>
	</div>
</Page>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20vh;
        gap: 1rem;
		height: 100%;
	}
	.form {
		background-color: var(--primary);
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
</style>
