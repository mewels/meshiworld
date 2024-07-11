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
            <input class = "text" type = "text"  placeholder = 'search by name or ingredient' name = "searchkey" id = "searchkey"  autocomplete="off"
            value = {form?.results === undefined ? '' : ''}
            size = 50
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
                    <p>no results found...</p>
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
    input.text {
        background:none;
        border-style: none;
        padding: .2rem;
        padding-top:.4rem;
        text-align: center;
        font-style: italic;
	    font-weight:lighter;
        font-size: 25px;
        font-family: pixelify;
        color: var(--text-color);
    }

    input.text:focus {
        outline:none;
    }

    ul {
        list-style-type: none;
        padding-left: 0px;
        margin-left: 2rem;
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
