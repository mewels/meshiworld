<script>
    import {page} from '$app/stores'
    import InfoHead from "$lib/InfoHead.svelte";
    export let data;
    // import Img from '../lib/Img.svelte';

    // import nekoedit from './assets/nekoedit.png' 
    let ingredientlist = [{name: '', amount: ''}];
    let steplist = [{number: 1, action: ''}];
    let name = '';

    const addIngredient = () =>{
        ingredientlist = [...ingredientlist, {name: '', amount: ''}]
    };

    const removeIngredient = () => {
        ingredientlist = ingredientlist.slice(0, ingredientlist.length-1)
    };

    const addStep = () => {
        steplist = [...steplist, {number: steplist.length+1, action: ''}]
    };

    const removeStep = () => {
        steplist = steplist.slice(0, steplist.length-1)
    };

    $: compiledrecipe = {
        name: name,
        ingredients: ingredientlist,
        steps: steplist
    };

</script>

<InfoHead pagedescription="> ______ /<" pagetitle ="hell world" pageurl = {$page.url}/>


<body>
<aside class = "sidebar">
    <h3 class = "sidebar">recipes</h3>
    <ul>
        {#each data.recipes as {id, name}}
            <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
        {/each}
    </ul>
    <a href = "/recipes/" data-sveltekit-preload-data>see all recipes</a>
</aside>

<div class = "container">
    <h1>Recipe Input Form</h1>
        <label>
            recipe name: 
            <input type = "text" id = "name" name="name" bind:value = {name} required minlength = 1 size = 20/>
        </label>
                
        <h3>add ingredients</h3>
        {#each ingredientlist as a, i}
            <div class = "element">
                <label>
                    name:  
                    <input type = "text" id = {i} name="name" bind:value = {ingredientlist[i].name} required minlength = 1 size = 20
                    />
                </label>
                <label>
                    amount: 
                    <input type = "text" id = {i} name="amount" bind:value = {ingredientlist[i].amount} required minlength = 1 size = 20/>
                </label>
            </div>
        {/each}

        <button on:click|preventDefault = {addIngredient}>Add</button>
        <button on:click = {removeIngredient}>Remove</button>

        <h3>add steps</h3>
        {#each steplist as s, i}
        <div class = "element">
            <label>
                [{steplist[i].number}]:
                <input type = "text" id = {i} name="action" bind:value = {steplist[i].action} required minlength = 1 size = 20/>
            </label>
        </div>
        {/each}

        <button on:click|preventDefault = {addStep}>Add</button>
        <button on:click = {removeStep}>Remove</button>
        
        <div class = "submit">
            <form method="POST" action='?/create'>
                <input type = "hidden" name = "compiledrecipe" id = "compiledrecipe" value = {JSON.stringify(compiledrecipe)}>
                <button>
                    submit recipe
                </button>
            </form>
        </div>
    
    <!-- <div>
        <form method="POST" action='?/search'>
            <label>search: 
                <input type = "text" name = "name" id = "name" autocomplete="off">
            </label>
        </form>
    </div> -->

    <br>
    <br>

    <div>
        <form method="POST" action='?/delete'>
            <label>
                <button>
                    delete delete delete
                </button> 
            </label>
        </form>
    </div>
</div>
</body>

<style>
    body {
        background-color: whitesmoke;
    }

    aside.sidebar {
        width: 25%;
        max-width: 400px;
        min-height: 100vh;
        padding-bottom: 4rem;
        padding: 2em;
        border-radius: 30px;
        border:hidden;
        float:inline-start;
        background-color: darksalmon;
    }

    div {
        max-width: 400px;
        margin: auto;
        border: hidden;
        border-radius: 30px;
    }

    div.container {
        min-height: 100vh;
        padding-bottom: 4rem;
        padding: 2em;
        background-color: rgba(226, 255, 254, 0.959);
    }

    div.element {
        margin-top: 1em;
        margin-bottom: 1em;
        line-height: 1;
    }

    div.submit {
        margin: 2em;
    }

    h1 {
        text-align: center;
    }

    h3 {
        text-align: center;
    }

    h3.sidebar {
        text-align:left;
    }
    

</style>