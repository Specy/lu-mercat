<script lang="ts">
	import Navbar from '$cmp/Navbar.svelte';
	import LoggerProvider from '$cmp/providers/LoggerProvider.svelte';
	import PromptProvider from '$cmp/providers/PromptProvider.svelte';
	import ThemeProvider from '$cmp/providers/ThemeProvider.svelte';
	import { onMount } from 'svelte';
	import '../global.css';

	onMount(async () => {
		if ('serviceWorker' in navigator) {
			try {
				const registration = await navigator.serviceWorker.register('/sw.js');
				if (registration.installing) {
					console.log('Service worker installing');
				} else if (registration.waiting) {
					console.log('Service worker installed');
				} else if (registration.active) {
					console.log('Service worker active');
				}
			} catch (error) {
				console.error(`Registration failed with ${error}`);
			}
		}
	});
</script>

<Navbar />
<ThemeProvider>
	<PromptProvider>
		<LoggerProvider>
			<slot />
		</LoggerProvider>
	</PromptProvider>
</ThemeProvider>

<style lang="scss">
	:global(body) {
		background-color: var(--background);
	}
</style>
