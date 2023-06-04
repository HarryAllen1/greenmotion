import { sveltekit } from '@sveltejs/kit/vite';
import { extname } from 'node:path';
import { imagetools } from 'vite-imagetools';
import wasm from 'vite-plugin-wasm';
import { defineConfig } from 'vitest/config';

const fallback: Record<string, string> = {
	'.heic': 'jpg',
	'.heif': 'jpg',
	'.avif': 'png',
	'.jpeg': 'jpg',
	'.jpg': 'jpg',
	'.png': 'png',
	'.tiff': 'jpg',
	'.webp': 'png',
	'.gif': 'gif',
};

export default defineConfig({
	build: {
		target: 'es2022',
	},
	plugins: [
		wasm(),
		imagetools({
			defaultDirectives: (url) => {
				const ext = extname(url.pathname);
				const params = new URLSearchParams();
				params.set('format', 'avif;webp;' + fallback[ext]);
				if (
					!params.has('meta') &&
					!params.has('metadata') &&
					!params.has('source') &&
					!params.has('srcset') &&
					!params.has('url')
				) {
					params.set('picture', 'true');
				}
				return params;
			},
		}),
		sveltekit(),
	],
	test: {
		browser: {
			name: 'chromium',
			provider: 'playwright',
			headless: true,
			enabled: true,
		},
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
	},
});
