import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { extname } from 'node:path';

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
});
