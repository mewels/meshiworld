<script>
    import {page} from '$app/stores';
    import InfoHead from "$lib/InfoHead.svelte";
    import Recipe from '../Recipe.svelte';
    import Nav from '../../Nav.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<InfoHead pagedescription = "yay!" pagetitle = {data.recipe.name} pageurl={$page.url}/>
<body>
    <Nav></Nav>

    <Recipe name = {data.recipe.name} ilist = {data.recipe.ingredients} slist = {data.recipe.steps}/>
</body>
