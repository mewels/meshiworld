<script>
    import {page} from '$app/stores';
    import InfoHead from "$lib/InfoHead.svelte";
    import Recipe from '../Recipe.svelte';
    import Nav from '../../Nav.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<InfoHead pagedescription = "yay!" pagetitle = {data.recipe.name} pageurl={$page.url}/>
<div>
    <Recipe name = {data.recipe.name} user = {data.recipe.user} notes = {data.recipe.notes} seclist={data.recipe.sections} userid = {data.recipe.userId}
    />

    {#if data.sessionuser}
        {#if data.recipe.user === data.sessionuser.username}
            <form method='POST' action='?/edit'>
                <button class = "edit">
                    edit
                </button>
            </form>
            <form method='POST' action='?/delete'><button>delete this recipe</button></form>
        {/if}
    {/if}
</div>

<style>
</style>