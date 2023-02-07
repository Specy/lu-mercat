<script lang="ts">
	import LoggerProvider from "$cmp/providers/LoggerProvider.svelte";
	import PromptProvider from "$cmp/providers/PromptProvider.svelte";
	import ThemeProvider from "$cmp/providers/ThemeProvider.svelte";
    import '../global.css'
</script>


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