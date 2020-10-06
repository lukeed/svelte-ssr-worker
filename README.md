# svelte-ssr-worker

> A quick demo for rendering Svelte server-side (SSR), but within a [Cloudflare Worker](https://workers.cloudflare.com/)!

[Live Demo](https://cloudflareworkers.com/#9e1f81f41405f8851b39f4643ce12754:https://tutorial.cloudflareworkers.com/)

This is a demo meant to illustrate how to get Svelte SSR in a Cloudflare worker. It is _intentionally_ very minimal – it extends the official [`svelte-template`](https://github.com/sveltejs/template).


## Install

```sh
$ git clone https://github.com/lukeed/svelte-ssr-worker
$ cd svelte-ssr-worker
$ npm install
```

## Scripts

The following are `npm` scripts included in the project.<br>
They are invoked via `npm run <name>` on the command line; for example: `npm run build:dom`.

### `build`

This is an alias for _sequentially_ running the `build:dom` and `build:ssr` scripts.

> **Note:** These are sequential because `build:ssr` imports the `public/index.html` that `build:dom` produces.


### `build:dom`

Builds the client for production, using the `src/index.dom.js` entry point.

All files within the `/public` directory comprise your front-end client application.

> **Important:** These must be uploaded to a storage bucket and made available on a CDN location. <br>Alternatively, you may upload `/public` as a [static Workers Site](https://developers.cloudflare.com/workers/platform/sites/start-from-existing).


### `build:ssr`

Builds your Cloudflare Worker code, using the `src/index.ssr.js` entry point.

The final worker file is saved to `build/index.js`, which can be deployed to your Cloudflare Worker directly.

> **Note:** Deployment is not included in this template.

> **Important:** This script _must run after_ `build:dom` because it relies on its `public/index.html` output.

### `start`

Starts a local development server.<br>
This is used to preview/visit your front-end application _only_.

> **Note:** This does not run your Worker code.

### `watch`

This is an alias for running the `start` and `watch:dom` scripts simultaneously.

### `watch:dom`

Watches your `src/index.dom.js` and its imports for changes.

### `watch:ssr`

Watches your `src/index.ssr.js` and its imports for changes.


## Deploy

You should have a storage bucket setup and attached to a CDN ahead of time.<br>
Once the CDN address is known, you will need to update the `{{CDN}}` value within `config/shared.js`.

Then, after a successful `build`, you will need to:

* Upload `public/*` to your storage bucket (or similar)
* Upload `build/index.js` to Cloudflare Workers

> **Note:** Cloudflare's `wrangler` can handle both of these steps!

You're done~! :tada:


## License

MIT © [Luke Edwards](https://lukeed.com)
