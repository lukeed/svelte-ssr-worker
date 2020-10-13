import App from './App.svelte';

export default new App({
	target: document.body,
	hydrate: true,
	props: {
		name: location && location.pathname.substring(1) || 'world'
	}
});
