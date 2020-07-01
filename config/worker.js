const commonjs = require('@rollup/plugin-commonjs');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const { string } = require('rollup-plugin-string');

module.exports = {
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
		resolve({ browser: true }),
		commonjs(),

		// to load our HTML template as a string
		string({ include: 'src/index.html' })
	]
};
