<script>
    import {page} from '$app/stores';
    import InfoHead from "$lib/InfoHead.svelte";
    import Nav from '../Nav.svelte';


    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').ActionData} */
	export let form;

    var searchkey = 'nsearch';    
</script>

<InfoHead pagedescription="0 ____ 0" pagetitle ="Bagel's collaborative cookbook!" pageurl = {$page.url}/>

<body>
    <form method="POST" action='?/{searchkey}'>
        <label>search: 
            <input type = "text"  placeholder = 'Search by name or ingredient' name = "searchkey" id = "searchkey"  autocomplete="off"
            value = {form?.results === undefined ? '' : ''}
            />
        </label>
    </form>
    {#each ["nsearch", "isearch"] as searchtype}
        <label>
            <input type = "radio" name = "search" value = {searchtype} bind:group = {searchkey} />
            {searchtype === "nsearch" ? "name" : "ingredient"}
        </label>
    {/each}
    
    <ul>
        {#if form?.results === undefined}
            {#each data.recipes as {id, name}}
                <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
            {/each}
        {:else}
            {#if Object.is(form?.results, [])}
                <p>No results found 0 ____ o</p>
            {:else} 
                {#each form?.results as {id, name}}
                    <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
                {/each}
            {/if}
        {/if}   
    </ul>
</body>
