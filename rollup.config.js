import svelte from 'rollup-plugin-svelte';
import { string } from 'rollup-plugin-string';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const config = require('./svelte.config');
const isDev = !!process.env.ROLLUP_WATCH;

// Shared
const Plugins = [
	resolve({
		browser: true,
		dedupe: ['svelte']
	}),
	commonjs(),
];

/** @type import('rollup').RollupOptions */
const Client = {
	input: 'src/client.js',
	output: {
		name: 'app',
		format: 'iife',
		file: 'public/bundle.js',
		sourcemap: isDev
	},
	plugins: [
		svelte({
			...config,
			dev: isDev,
			// extract css file (better performance)
			css: css => css.write('bundle.css')
		}),

		...Plugins,

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		isDev && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		!isDev && terser(),
	],
	watch: {
		clearScreen: false
	}
};

/** @type import('rollup').RollupOptions */
const Worker = {
	input: 'src/worker.js',
	output: {
		format: 'esm',
		file: 'build/worker.js',
		sourcemap: false,
	},
	treeshake: {
		propertyReadSideEffects: false,
		moduleSideEffects: 'no-external'
	},
	external: [
		...require('module').builtinModules
	],
	plugins: [
		...Plugins,
		svelte({
			...config,
			dev: isDev,
			generate: 'ssr',
			extensions: ['.svelte'],
			css: false,
		}),
		// load HTML template as a string
		string({ include: 'src/index.html' }),
	]
};

// Array => Parallel Builds~!
export default [Client, Worker];
