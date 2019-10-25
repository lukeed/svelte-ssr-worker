<script>
	export let name;
</script>

<style>
	h1 {
		color: purple;
	}
	.notice {
		width: auto;
		display: inline-block;
		border: 2px solid green;
		padding: 2em;
	}
	.notice hr {
		margin: 2em 0;
		border-color: green;
	}
</style>

<h1>Hello {name}!</h1>

<figure class="notice">
	<p><strong>THIS IS A DEMO</strong></p>
	<p>Navigate to any pathname; eg `/lukeed` for updated SSR response.</p>
	<p>On the server-side app, the greeting will always update.</p>
	<p>On the client-side app, it will always read "Hello world!"</p>

	<hr>

	<p>PS – There is no CDN set up, so 404s are expected.</p>
</figure>
