<script>
    import {page} from '$app/stores';
    import InfoHead from "$lib/InfoHead.svelte";
    import Recipe from '../Recipe.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<InfoHead pagedescription = "yay!" pagetitle = {data.recipe.name} pageurl={$page.url}/>

<Recipe name = {data.recipe.name} ilist = {data.recipe.ingredients} slist = {data.recipe.steps}/>