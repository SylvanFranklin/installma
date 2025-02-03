import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        appDir: 'app',
        paths: {
            base: dev ? '' : process.env.BASE_PATH,
        },
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: 'index.html',
            precompress: false,
            strict: true
        })
    }
};

export default config;
