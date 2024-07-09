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
    let status = ["inline"];
    export let data;



    const addSection = () => {
        sectionlist.push({number: parseInt(sectionlist.length+1), title: '', ingredients: [{name: '', amount: ''}], steps: [{number: 1, action: ''}]});
        sectionlist=sectionlist
        selectSection(sectionlist.length-1)
    }

    function removeSection(j){
        if (sectionlist.length !== 1) {
            // sectionlist = sectionlist.slice(0, sectionlist.length-1);
            sectionlist.splice(j,1)
            status.splice(j,1)
            sectionlist=sectionlist
            status=status
            let index = 1
            for (const s of sectionlist){
                
                s.number = index;
                index++;
            }
            selectSection(sectionlist.length-1)
        }
    }

    function addIngredient(j) {
        sectionlist[j].ingredients = [...sectionlist[j].ingredients, {name: '', amount: ''}]
    };

    function removeIngredient(j){
        sectionlist[j].ingredients = sectionlist[j].ingredients.slice(0, sectionlist[j].ingredients.length-1)
    };

    function addStep(j){
        sectionlist[j].steps = [...sectionlist[j].steps, {number: sectionlist[j].steps.length+1, action: ''}]
    };

    function removeStep(j){
        sectionlist[j].steps = sectionlist[j].steps.slice(0, sectionlist[j].steps.length-1)
    };

    function selectSection(j) {
        status.fill("none");
        status[j] = "inline";
    }

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
        <div class = "tab">
            {#each sectionlist as x,j}
            <button class = "tablink" type="button" on:click={()=>selectSection(j)}>{sectionlist[j].number}</button>
            {/each}
            <button class = "tablink" type="button" on:click|preventDefault={addSection}>Add Section</button>

        </div>
        {#each sectionlist as x,j}
        {#if status[j] === "inline"}
        <div class = "sectioncontent">
            <div>this is section {j+1}</div>

            <div class = "element">
                <label>
                    <input type = "text" placeholder = "section title" id = "user" name="user" bind:value = {sectionlist[j].title} minlength = 1 size = 10/>
                </label>
                {#if sectionlist.length !== 1}
                    <button class = "remove" type= "button" on:click={()=>removeSection(j)}>Remove Section</button>
                {/if}
            </div>

                <h3>ingredients</h3>
                {#each sectionlist[j].ingredients as a, i}
                    <div class = "element ingredient">
                            <input type = "text" id = {i} placeholder="name of ingedient" name="name" bind:value = {sectionlist[j].ingredients[i].name} required minlength = 1 size = 20
                            />
                            <input type = "text" id = {i} placeholder = "amount of ingredient" name="amount" bind:value = {sectionlist[j].ingredients[i].amount} required minlength = 1 size = 20
                            />
                    </div>
                {/each}

                <div class = "element">
                    <button type= "button" on:click|preventDefault = {() => addIngredient(j)}>Add</button>
                    <button type= "button" on:click = {() => removeIngredient(j)}>Remove</button>
                </div>

                <h3>steps</h3>
                {#each sectionlist[j].steps as s, i}
                <div class = "element">
                    <label>
                        [{sectionlist[j].steps[i].number}]:
                        <textarea id = {i} name="action" bind:value = {sectionlist[j].steps[i].action} required minlength = 1 size = 20/>
                    </label>
                </div>
                {/each}

                <div class = "element">
                    <button type= "button" on:click|preventDefault = {() => addStep(j)}>Add</button>
                    <button type= "button" on:click = {() => removeStep(j)}>Remove</button>
                </div>

        </div>
        {/if}
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

    div.sectioncontent {
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

    button.remove {
        position: right;
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