<script lang="ts">
	import { fly } from 'svelte/transition';

</script>

<div class="page" in:fly={{ duration: 200, y: -30, opacity: 0.8}}>
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
