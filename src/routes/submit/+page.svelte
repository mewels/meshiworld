<script>
    import {page} from '$app/stores'
    import InfoHead from "$lib/InfoHead.svelte";
    // import Img from '../lib/Img.svelte';
    import Nav from "../Nav.svelte";

    // import nekoedit from './assets/nekoedit.png' 
    let ingredientlist = [{name: '', amount: ''}];
    let steplist = [{number: 1, action: ''}];
    let sectionlist = [{number: 1, title: '', ingredients: ingredientlist, steps: steplist}];
    let name = '';
    let user = '';
    let notes = '';
    let userid = null;
    let sectionindex = 0;
    export let data;

    const addIngredient = () =>{
        sectionlist[sectionindex].ingredients = [...sectionlist[sectionindex].ingredients, {name: '', amount: ''}]
    };

    const removeIngredient = () => {
        sectionlist[sectionindex].ingredients = sectionlist[sectionindex].ingredients.slice(0, sectionlist[sectionindex].ingredients.length-1)
    };

    const addStep = () => {
        sectionlist[sectionindex].steps = [...sectionlist[sectionindex].steps, {number: sectionlist[sectionindex].steps.length+1, action: ''}]
    };

    const removeStep = () => {
        sectionlist[sectionindex].steps = sectionlist[sectionindex].steps.slice(0, sectionlist[sectionindex].steps.length-1)
    };

    $: if (data.sessionuser) {
        user = data.sessionuser.username
        userid = data.sessionuser.id
    }

    $: compiledrecipe = {
        name: name,
        user: user,
        notes: notes,
        sections: sectionlist,
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
            <div class = "usertag" style="text-align:center;">submitting as 
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

        <h3>sections </h3>
        {#each sectionlist as x}
        <div class = "section">
                <h3>ingredients</h3>
                {#each sectionlist[sectionindex].ingredients as a, i}
                    <div class = "element ingredient">
                            <input type = "text" id = {i} placeholder="name of ingedient" name="name" bind:value = {sectionlist[sectionindex].ingredients[i].name} required minlength = 1 size = 20
                            />
                            <input type = "text" id = {i} placeholder = "amount of ingredient" name="amount" bind:value = {sectionlist[sectionindex].ingredients[i].amount} required minlength = 1 size = 20
                            />
                    </div>
                {/each}

                <div class = "element">
                    <button on:click|preventDefault = {addIngredient}>Add</button>
                    <button on:click = {removeIngredient}>Remove</button>
                </div>

                <h3>steps</h3>
                {#each sectionlist[sectionindex].steps as s, i}
                <div class = "element">
                    <label>
                        [{sectionlist[sectionindex].steps[i].number}]:
                        <textarea id = {i} name="action" bind:value = {sectionlist[sectionindex].steps[i].action} required minlength = 1 size = 20/>
                    </label>
                </div>
                {/each}

                <div class = "element">
                    <button on:click|preventDefault = {addStep}>Add</button>
                    <button on:click = {removeStep}>Remove</button>
                </div>

        </div>
        {/each}

        

        {#if !data.sessionuser}
        <p class = "notes">
            recipes can be modified if you're logged in. make an account by pressing 'log in' above :3
        </p>
        {/if}
        
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

    div.section {
        margin-top: .5em;
        margin-bottom: .5em;
        border-style: solid;
        border-width: 1px;
        border-color: black;
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