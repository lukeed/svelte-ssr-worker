import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export const isDev = !!process.env.ROLLUP_WATCH;
export const Svelte = require('../svelte.config');

// TODO: Update CDN value :)
export const Replaces = {
	'{{CDN}}': isDev ? '' : 'https://cdn.example.com',
	'process.env.NODE_ENV': isDev ? 'development' : 'production',
}

export function Plugins(isDOM) {
	return [
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs({
			sourceMap: isDev
		}),
		replace({
			...Replaces,
			'process.browser': isDOM ? 'true' : 'false',
		}),
		svelte({
			// @ts-ignore
			...Svelte, dev: isDev,
			generate: isDOM ? 'dom' : 'ssr',
			css: isDOM && (css => css.write('bundle.css', isDev))
		})
	];
}
