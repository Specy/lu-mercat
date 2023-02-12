import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { resolve } from 'path';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		alias: {
			$cmp: resolve('./src/components/'),
			$stores: resolve('./src/stores/'),
			$utils: resolve('./src/utils/')
		}
	}
};

export default config;