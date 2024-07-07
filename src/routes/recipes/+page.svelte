<script>
    import {page} from '$app/stores';
    import { enhance } from '$app/forms';
    import InfoHead from "$lib/InfoHead.svelte";
    import Nav from '../Nav.svelte';


    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').ActionData} */
	export let form;

    var searchkey = 'nsearch';    
</script>

<InfoHead pagedescription="0 ____ 0" pagetitle ="meshi  . world" pageurl = {$page.url}/>

<div>
    <form method="POST" action='?/{searchkey}' use:enhance>
        <label>
            <input type = "text"  placeholder = 'Search by name or ingredient' name = "searchkey" id = "searchkey"  autocomplete="off"
            value = {form?.results === undefined ? '' : ''}
            size = 16
            />
        </label>
    </form>


    <div class = "radios">
    {#each ["nsearch", "isearch", "usearch"] as searchtype}
        <label>
            <input type = "radio" name = "search" value = {searchtype} bind:group = {searchkey} />
            {#if searchtype === "nsearch"}
            name
            {:else if searchtype === 'isearch'}
            ingredient
            {:else if searchtype === 'usearch'}
            user
            {/if}
        </label>
        {/each}
    </div>
    
    <div class = recipes>
        <ul>
            {#if form?.results === undefined}
                {#each data.recipes as {id, name}}
                    <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
                {/each}
            {:else}
                {#if Object.is(form?.results, []) ||  form?.results.length === 0}
                    <p>No results found</p>
                {:else} 
                    {#each form?.results as {id, name}}
                        <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
                    {/each}
                {/if}
            {/if}   
        </ul>
    </div>
    
</div>

<style>
    ul {
        list-style-type: none;
        padding-left: 0px;
    }

    form {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .recipes {
        display: flex;
        flex-wrap: wrap;
    }

    .radios {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        position:relative;
        right: 3px;
    }
</style>
