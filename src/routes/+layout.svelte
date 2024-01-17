<script>
    import { page } from '$app/stores';
    import Nav from './Nav.svelte';
</script>

<a href="#main" class="skip-to-content">Skip to content</a>
<div class="container">
	<Nav></Nav>
	<main id="main" class="page-width page-padding">
		<slot />
	</main>
</div>

<style>
	.container {
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 4rem;
		container-type: inline-size;
		position: relative;
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