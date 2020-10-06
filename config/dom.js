import * as fs from 'fs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import { isDev, Plugins, Replaces } from './shared';

/**
 * Copy & Replace HTML Vars
 * @returns {import('rollup').Plugin}
 */
function HTML(options={}) {
	const { input, output } = options;

	return {
		name: 'html-replace',
		buildStart() {
			if (!fs.existsSync(input)) {
				throw new Error('Missing HTML input!');
			}

			if (isDev && this.addWatchFile) {
				this.addWatchFile(input);
			}
		},
		buildEnd(err) {
			if (err) throw err;

			let data = fs.readFileSync(input, 'utf8');

			for (let key in Replaces) {
				data = data.replace(new RegExp(key, 'g'), Replaces[key]);
			}

			fs.writeFileSync(output, data);
		}
	}
}

/** @type import('rollup').RollupOptions */
export default {
	input: 'src/client.js',
	output: {
		name: 'app',
		format: 'iife',
		file: 'public/bundle.js',
		sourcemap: isDev
	},
	plugins: [
		// build: DOM output
		...Plugins(true),

		HTML({
			input: 'src/index.html',
			output: 'public/index.html',
		}),

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
