<script lang="ts">
	import { fly } from 'svelte/transition';
	export let style: string = ""
</script>

<div class="page" in:fly={{ duration: 200, y: -30, opacity: 0.8}}>
	<div class="content" {style}>
		<slot />
	</div>
</div>

<style lang="scss">
	.page,
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.page {
		align-items: center;
	}
	.content {
		width: 100%;
		padding: 1rem;
		max-width: 50rem;
	}
</style>
