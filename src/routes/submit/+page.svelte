<script>
    import {page} from '$app/stores'
    import InfoHead from "$lib/InfoHead.svelte";
    // import Img from '../lib/Img.svelte';
    import Nav from "../Nav.svelte";

    // import nekoedit from './assets/nekoedit.png' 
    let ingredientlist = [{name: '', amount: ''}];
    let steplist = [{number: 1, action: ''}];
    let name = '';
    let user = '';
    let notes = '';
    let userid = null;
    export let data;


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

    $: if (data.sessionuser) {
        user = data.sessionuser.username
        userid = data.sessionuser.id
    }

    $: compiledrecipe = {
        name: name,
        user: user,
        notes: notes,
        ingredients: ingredientlist,
        steps: steplist,
        userid: userid
    };

</script>

<InfoHead pagedescription="> ______ /<" pagetitle ="hell world" pageurl = {$page.url}/>

<div>
    <div class = "submit">
    <form method="POST" action='?/create'>
        <h2>drop the method~</h2>
        <div class = "element">
            <label>
                <input type = "text" placeholder = "recipe name" id = "name" name="name" bind:value = {name} required = "true" minlength = 1 size = 20/>
            </label>
        </div>

        {#if data.sessionuser}
            <div class = "usertag" style="text-align:center;">submitting from 
                <a href = "https://meshi.world/user/{user}">{user}
                </a>
            </div>
        {:else}
            <div class = "element">
                <label>
                    <input type = "text" placeholder = "your name" id = "user" name="user" bind:value = {user} minlength = 1 size = 10/>
                </label>
            </div>
        {/if}

        <div class = "element">
            <textarea bind:value = {notes} name = "notes" id = "notes" placeholder="notes (optional)" size = 30/>
        </div>

        <h3>ingredients</h3>
        {#each ingredientlist as a, i}
            <div class = "element ingredient">
                    <input type = "text" id = {i} placeholder="name of ingedient" name="name" bind:value = {ingredientlist[i].name} required minlength = 1 size = 20
                    />
                    <input type = "text" id = {i} placeholder = "amount of ingredient" name="amount" bind:value = {ingredientlist[i].amount} required minlength = 1 size = 20
                    />
            </div>
        {/each}

        <div class = "element">
            <button on:click|preventDefault = {addIngredient}>Add</button>
            <button on:click = {removeIngredient}>Remove</button>
        </div>

        <h3>steps</h3>
        {#each steplist as s, i}
        <div class = "element">
            <label>
                [{steplist[i].number}]:
                <textarea id = {i} name="action" bind:value = {steplist[i].action} required minlength = 1 size = 20/>
            </label>
        </div>
        {/each}

        <div class = "element">
            <button on:click|preventDefault = {addStep}>Add</button>
            <button on:click = {removeStep}>Remove</button>
        </div>

        <p class = "notes">
            at this time, recipes cannot be deleted or modified after submission - please make sure you're happy before submitting!!
        </p>
        
        
        <input type = "hidden" name = "compiledrecipe" id = "compiledrecipe" value = {JSON.stringify(compiledrecipe)}>
        <button>
            submit recipe
        </button>
    </form>
    </div>
</div>

<style>
    div.element {
        margin-top: .5em;
        margin-bottom: .5em;
        line-height: 1;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
    }

    div.ingredient > input {
        width: 10rem;
        margin: .5rem;
        margin-top: .5em;
        margin-bottom: .5em;
    }

    div.submit {
        margin: 2em;
    }

    div.usertag {
        font-size: 16px;
    }

    p.notes {
        display: flex;
        flex-wrap: wrap;
        font-size: 15px;
        text-align: center;
        max-width: 20rem;
        margin:auto;
    }

    h3 {
        margin-bottom: 0;
    }
</style>