import HTML from './index.html'; // via `rollup-plugin-string`
import App from './_server'; // auto-generated

// TODO: Update this
const MY_CDN = 'https://cdn.example.com';

addEventListener('fetch', event => {
	const req = event.request;
	const url = new URL(req.url);

	// use `/[pathname]` if not root
	const name = url.pathname.substring(1) || 'friend';

	const ssr = App.render({ name });

	let inject_head = ssr.head || '';
	if (ssr.css && ssr.css.code) {
		inject_head += `<style>${ssr.css.code}</style>`;
	}

	const output = (
		// Always use the CDN bucket
		HTML.replace(/_CDN_BUCKET_/g, MY_CDN)
			// inject SSR'd header & body contents
			.replace(/_INJECT_HEAD_/g, inject_head)
			.replace(/_INJECT_BODY_/g, ssr.html)
	);

	event.respondWith(
		new Response(output, {
			status: 200,
			headers: {
				'content-type': 'text/html;charset=UTF-8'
			}
		})
	);
});
