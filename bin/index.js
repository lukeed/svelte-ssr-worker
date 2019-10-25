#!/usr/bin/env node
const fs = require('fs');
const mri = require('mri');
const { join } = require('path');
const { promisify } = require('util');
const rollup = require('rollup');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

const argv = mri(process.argv.slice(2));

const MY_CDN = 'https://cdn.example.com'; // TODO: Update this
const TEMPLATE = join(__dirname, '..', 'src', 'index.html');

// What to build: client | server | worker
const [entry = 'client'] = argv._;
const isWatch = !!argv.watch;

console.log(`~> building "${entry}" bundle`);

if (isWatch) {
	process.env.ROLLUP_WATCH = '1';
}

// Copy the "src/index.html" file
// And inject ENV vars at the same time
// Note: The "worker" injections are done at runtime
async function template() {
	let assets_location = isWatch ? '' : MY_CDN;
	let html = await read(TEMPLATE, 'utf8');

	// Always remove _INJECT_ vars
	html = html.replace(/_INJECT_(HEAD|BODY)_/g, '');
	// local development uses "/" else CDN
	html = html.replace(/_CDN_BUCKET_/g, assets_location);

	// the "public" dir already exists
	let file = join(__dirname, '..', 'public', 'index.html');
	await write(file, html, 'utf8');
	console.log('~> wrote "public/index.html" with values');
}

async function bundle() {
	const config = require(`../config/${entry}`);
	if (isWatch) {
		let ran = false;
		// Mostly ported from Sapper:
		const watcher = rollup.watch(config);
		watcher.on('event', async evt => {
			switch (evt.code) {
				case 'FATAL':
					// TODO kill the process?
					if (evt.error.filename) {
						console.error(
							[`Failed to build — error in ${evt.error.filename}: ${evt.error.message}`, evt.error.frame].filter(Boolean).join('\n')
						);
					}
					break;

				case 'ERROR':
					console.error('build error:', evt.error);
					break;

				case 'START':
				case 'END':
				case 'BUNDLE_START':
					// TODO?
					break;

				case 'BUNDLE_END':
					if (entry === 'client') {
						ran || await template();
						ran = true;
					}
					break;

				default:
					console.log(`Unexpected event ${evt.code}`);
			}
		});
	} else {
		const { output, ...input } = config;
		const bundle = await rollup.rollup(input);
		await bundle.write(output);
		if (entry === 'client') {
			await template();
		}
	}
}

bundle().then(() => {
	console.log(`~> completed "${entry}" bundle!`);
}).catch(err => {
	console.error('SHOOT~', err);
});
