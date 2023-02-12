import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { resolve } from 'path'

const config: UserConfig = {
	server: {
		port: 3000,
	},
	plugins: [
		sveltekit(),
	],
};

export default config;