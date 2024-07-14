<script>
    import {page} from '$app/stores';
    import InfoHead from "$lib/InfoHead.svelte";
    import User from '../User.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<InfoHead pagedescription = "{data.username}'s page!" pagetitle = {data.username} pageurl={$page.url}/>

{#if data.sessionuser}
<User pageuser = {data.username} recipes = {data.recipes} allrecipes = {data.allrecipes} allusers = {data.allusers} sessionuser = {data.sessionuser.username}/>
{:else}
<User pageuser = {data.username} recipes = {data.recipes} allrecipes = {data.allrecipes} allusers = {data.allusers} datasessionuser = ''/>
{/if}

