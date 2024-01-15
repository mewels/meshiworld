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
<!-- <h1>images you might like</h1>

<Img ilink = {nekoedit} ialt = 'an image you might like' icaption = 'the first image on this dumb website'/> -->
<div class = "transbox">
    <a href = "/recipes/">see all recipes</a>
</div>
<h1>Recipe Input Form</h1>
<div class = "transbox">
        <label>
            recipe name: 
            <input type = "text" id = "name" name="name" bind:value = {name} required minlength = 1 size = 20/>
        </label>
                
        <h1>add ingredients</h1>
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

        <h1>add steps</h1>
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
        
        <div>
            <form method="POST" action='?/create'>
                <input type = "hidden" name = "compiledrecipe" id = "compiledrecipe" value = {JSON.stringify(compiledrecipe)}>
                <button>
                    submit recipe
                </button>
            </form>
        </div>
    
    <div>
        <form method="POST" action='?/list'>
            <button>list recipes in console</button>
        </form>
    </div>
    <div>
        <form method="POST" action='?/search'>
            <label>search: 
                <input type = "text" name = "name" id = "name" autocomplete="off">
            </label>
        </form>
    </div>

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
    <!-- <div>
        {JSON.stringify(name,null,2)}
    </div>
    <div>
        {JSON.stringify(ingredientlist,null,2)}
    </div>
    <div>
        {JSON.stringify(steplist,null, 2)}
    </div>
    <h1>compiled result</h1>
    <div>
        {JSON.stringify(compiledrecipe)}
    </div> -->
</div>
</body>

<style>
    body {
        background-color: whitesmoke;
    }

    div {
    max-width: 400px;
    margin: auto;
    border: hidden;
    border-radius: 30px;
    }

    div.transbox {
    background-color: rgba(245, 245, 245, 0.589);
    padding: 30px;
    padding-top: 1px;
    }

    div.element {
        margin-top: 1em;
        margin-bottom: 1em;
        line-height: 1;
    }

    p {
        margin: inherit;
    }

    h1 {
        text-align: center;
    }
    

</style>