<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';

	export let animate = true;
</script>

<div class="page" in:scale={{ duration: 200, start: 0.9, opacity: 0.4}}>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	.page,
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-top: 2rem;
	}
	.page {
		align-items: center;
		padding: 1rem;
	}
	.content {
		width: 100%;
		max-width: 60rem;
	}
</style>
