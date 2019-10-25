const svelte = require('rollup-plugin-svelte');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
	input: 'src/server.js',
	output: {
		format: 'esm',
		file: 'src/_server.js',
		sourcemap: false,
	},
	plugins: [
		svelte({
			dev: false,
			generate: 'ssr',
			css: false
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),

		commonjs(),

		production && terser()
	]
};
