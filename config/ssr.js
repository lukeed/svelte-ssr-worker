import { string } from 'rollup-plugin-string';

import { Plugins } from './shared';

/** @type import('rollup').RollupOptions */
export default {
	input: 'src/index.ssr.js',
	output: {
		format: 'esm',
		file: 'build/index.js',
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
