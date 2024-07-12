<script>
    import { page } from '$app/stores';
	import { browser } from '$app/environment';
    import Nav from './Nav.svelte';
	import Switcher from '../lib/Switcher.svelte';
    import '../app.css'
	import { onDestroy, onMount } from 'svelte';
	import { theme } from '../stores.js'
	export let data;

	// $: document.querySelector("body").classList=[$theme]

	const unsubscribe = theme.subscribe((value) => {
		if(browser)document.querySelector("body").classList=[value]
	});
	onMount(()=>{if(browser)document.querySelector("body").classList=[$theme]})
	onDestroy(unsubscribe)
</script>

<a href="#main" class="skip-to-content">Skip to content</a>
<div class="container">
	<Nav sessionuser = {data.sessionuser}></Nav>
	<main id="main" class="page-width page-padding">
		<slot />
	</main>
</div>
<span class = "switch"><Switcher/></span>

<style>
	.container {
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 4rem;
		container-type: inline-size;
		position: relative;

	}

	.switch {
		position:fixed;
		bottom: 50px;
		right: 50px;
		font-family:pixelify;
	}

	.skip-to-content {
		position: absolute;
		left: 0;
		z-index: 1;
		background: var(--background-color);
		padding: 0.25rem 0.25rem;
		clip: rect(1px, 1px, 1px, 1px);
	}

	.skip-to-content:focus {
		clip: auto;
	}
</style>