<script>
    import {page} from '$app/stores'

    const links = {
        '/' : 'home',
        '/recipes' : 'recipes',
        '/submit' : 'submit'
    }

    /**
	 * @param {string} current_path
	 * @param {string} search_path
	 */
	function aria_current(current_path, search_path) {
		const is_in_path =
			search_path === '/'
				? current_path === '/'
				: current_path.startsWith(search_path)

		return is_in_path ? 'page' : null
	}
</script>

<div class="outer page-width page padding">
    <div class = "container">
        <header>bagel's collaborative cookbook ♡</header>
        <nav aria-label="bagelzone">
            <ul role ="menubar" aria-label="main navigation">
                {#each Object.entries(links) as [href, text]}
                    <li>
                        <a
                            {href}
                            aria-current={aria_current($page.url.pathname, href)}
							aria-label={text}
							role="menuitem"
                        >
                            {text}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        <!-- <Breadcrumbs></Breadcrumbs> -->
    </div>
</div>

<style>
	.outer {
		letter-spacing: 2px;
		padding-right: 1rem;
        padding-left: 1rem;
		position: sticky;
		top: 0;
		background: var(--background-color);
		line-height: 1;
	}

	.container {
		border-bottom: 1px solid var(--mid-grey);
		padding: 0.75rem 0;
        text-align: center;
	}

    header {
        font-size: 20px;
    }
	ul {
		display: flex;
		gap: 0.5rem 1rem;
		list-style-type: none;
		margin: 0;
		padding: 0;
		margin-top: 1rem;
		flex-wrap: wrap;
        align-content: center;
        justify-content: center;
	}

	a:active {
		background: var(--background-color) !important;
		color: var(--text-color) !important;
	}

    a:visited {
        color: var(--text-color);
        background: var(--background-color);
    }

	a[aria-current='page'] {
		background: var(--background-color);
		color:var(--theme-color);
	}
</style>