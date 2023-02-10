<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$cmp/buttons/Button.svelte';
	import ButtonLink from '$cmp/buttons/ButtonLink.svelte';
	import Input from '$cmp/inputs/Input.svelte';
	import Page from '$cmp/layout/Page.svelte';
	import { toast } from '$stores/toastStore';
	import { userStore } from '$stores/userStore';
	let username = '';
	let password = '';
</script>

<Page>
	<div class="content">
		<h1>Login</h1>

		<div class="form">
			<Input bind:value={username} placeholder="Username" />
			<Input bind:value={password} placeholder="Password" type="password" />

			<div class="column" style="align-items: center; gap: 0.4rem">
				<Button
					style="width: 100%; margin-top: 1rem"
					on:click={async () => {
						try {
							await userStore.login(username, password);
						} catch (e) {
							console.error(e);
							return toast.error('Invalid username or password');
						}
						toast.success('Logged in successfully');
						goto('/');
					}}
				>
					Login
				</Button>
				or
				<ButtonLink href="/register" style="width: 100%" cssVar="secondary">Register</ButtonLink>
			</div>
		</div>
	</div></Page
>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10vh;
		gap: 1rem;
		height: 100%;
	}
	.form {
		background-color: var(--primary);
		color: var(--primary-text);
		border-radius: 1rem;
		padding: 1rem;
		width: 100%;
		max-width: 30rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
</style>
