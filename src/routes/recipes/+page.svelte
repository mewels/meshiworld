<script>
    import {page} from '$app/stores';
    import InfoHead from "$lib/InfoHead.svelte";
    import Recipe from './Recipe.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<InfoHead pagedescription="0 ____ 0" pagetitle ="Bagel's collaborative cookbook!" pageurl = {$page.url}/>

<body>
    <h1>bagel's collaborative cookbook!</h1> 
    <ul>
        {#each data.recipes as {id, name}}
            <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
        {/each}
    </ul>
    <a href="../" data-sveltekit-preload-data>back to recipe form</a>
</body>
