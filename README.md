# svelte-ssr-worker

> A quick demo for rendering Svelte server-side (SSR), but within a [Cloudflare Worker](https://workers.cloudflare.com/)!

[Live Demo](https://cloudflareworkers.com/#1fa29e7f9b67c75f46893dcead7ee66d:https://tutorial.cloudflareworkers.com/)

This is a demo meant to illustrate how to get Svelte SSR in a Cloudflare worker.<br>
It's a very minimal template, but only because it extends the official [`svelte-template`](https://github.com/sveltejs/template).

> **Note:** I _may_ continue to update this over time, but no promises :innocent: I plan on releasing a more robust CLI solution in the near future. This was a quick example/simplification for a friend of what I already have.


## Install

```sh
$ git clone https://github.com/lukeed/svelte-ssr-worker
$ cd svelte-ssr-worker
$ npm install
```

## Scripts

The following are `npm` scripts included in the project.<br>
They are invoked via `npm run <name>` on the command line; for example: `npm run build:client`.

### `build`

This is an alias for running the `build:client`, `build:server`, and `build:worker` scripts in the right order.


### `build:client`

Builds the client for production.

All files within the `/public` directory comprise your front-end client application.

> **Important:** These _must_ be uploaded to a storage bucket and made available on a CDN location.


### `build:server`

Compiles your client application in Svelte's [`ssr`](https://svelte.dev/docs#svelte_compile) mode.

The result is saved as `src/_server.js` and **should not** be saved in your version control system.<br>
It's auto-generated and meant to be consumed by the `build:worker` script and `src/worker.js` file.


### `build:worker`

Builds your Cloudflare Worker code.<br>
This consumes the generated `src/_server.js` file and saves a copy of your HTML template (`src/index.html`).

The final worker file is saved to `build/worker.js`, which can be deployed to your Cloudflare Worker directly.

> **Note:** Deployment is not included in this template.

> **Important:** This script _must_ run after the `build:server` command.

### `start`

Starts a local development server.<br>
This is used to preview/visit your front-end application _only_.

> **Note:** This does not run your `worker.js` or `_server.js` files.

### `watch:client`

Watches your `src/client.js` and its imports for changes.<br>
On any change, rebuilds the front-end application.

### `watch`

This is an alias for running the `start` and `watch:client` scripts simultaneously.


## Deploy

You should have a storage bucket setup and attached to a CDN ahead of time.<br>
Once the CDN address is known, you will need to replace the `https://cdn.example.com` value from:

* `src/worker.js`
* `bin/index.js`

> **Note:** Presumably, this should never need to be changed again.

Then, after a successful `build`, you will need to:

* Upload `public/*` to that storage bucket
* Upload `build/worker.js` to Cloudflare Workers

You're done~! :tada:


## License

MIT © [Luke Edwards](https://lukeed.com)
