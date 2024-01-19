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
    <Recipe name = {data.recipe.name} user = {data.recipe.user} notes = {data.recipe.notes} ilist = {data.recipe.ingredients} slist = {data.recipe.steps}
    />
</div>
