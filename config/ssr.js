import { string } from 'rollup-plugin-string';

import { Plugins } from './shared';

/** @type import('rollup').RollupOptions */
export default {
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
	plugins: [
		...Plugins(false),

		string({
			// load HTML as a string
			include: 'public/index.html'
		}),
	]
};
