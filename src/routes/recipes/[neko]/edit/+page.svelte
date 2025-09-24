<script>
    import {page} from '$app/stores'
    import InfoHead from "$lib/InfoHead.svelte";
    import { enhance } from '$app/forms';
    // import Img from '../lib/Img.svelte';
    // import Nav from "../Nav.svelte";

    /** @type {import('./$types').ActionData} */
	export let form;

    export let data;

    // import nekoedit from './assets/nekoedit.png' 
    // let ingredientlist = [{name: '', amount: ''}];
    // let steplist = [{number: 1, action: ''}];
    let sectionlist = data.recipe.sections
    let name = data.recipe.name;
    let user = data.recipe.user;
    let notes = data.recipe.notes;
    let userid = data.recipe.userId;
    let id = data.recipe.id;
    let recsteplist = data.recipe.recsteps;
    let status = ["inline"];


    const addSection = () => {
        sectionlist.push({number: parseInt(sectionlist.length+1), title: '', ingredients: [{name: '', amount: ''}], steps: []});
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
    
    const addRecStep=()=>{
        recsteplist = [...recsteplist, {number: recsteplist.length+1, action: ''}] 
    };

    const removeRecStep=()=>{
        recsteplist = recsteplist.slice(0, recsteplist.length-1)
    }

    function selectSection(j) {
        status.fill("none");
        status[j] = "inline";
    }

    $: compiledrecipe = {
        id: id,
        name: name,
        user: user,
        notes: notes,
        sections: sectionlist,
        recsteps: recsteplist,
        userid: userid
    };
</script>

<InfoHead pagedescription="edit page" pagetitle ="editing {name}" pageurl = {$page.url}/>

<div>
    <div class = "submit">
    <form method="POST" action='?/update' use:enhance>
        <h2>drop the method~</h2>
        {#if data.sessionuser}
            <div class = "usertag" style="text-align:center;">submitting as 
                <a href = "https://meshi.world/user/{user}">{user}
                </a>
            </div>
        {:else}
            <div class = "element">
                <label>
                    <input class = "text" type = "text" placeholder = "your name" id = "user" name="user" bind:value = {user} minlength = 1 size = 10/>
                </label>
            </div>
        {/if}

        <div class = "element">
            <label>
                <input class = "title" type = "text" placeholder = "recipe name" id = "name" name="name" bind:value = {name} required = "true" minlength = 1 size = 20/>
            </label>
        </div>



        <div class = "element">
            <textarea class = "text" bind:value = {notes} name = "notes" id = "notes" placeholder="notes (optional)" size = 30/>
        </div>

        {#if form?.missing}
        <div style="text-align:center; color: var(--remove-color)">
            <div style="display:none;">{selectSection(form?.index)}</div>
            error: {form?.message}
        </div>
        {/if}

        <div class = "tab">
            {#each sectionlist as x,j}
            {#if status[j] === "inline"}
                <button class = "tablink" style="background-color:var(--section-color);" type="button" on:click={()=>selectSection(j)}>
                    {#if sectionlist[j].title !== ''}
                        {sectionlist[j].title}
                    {:else}
                        {sectionlist[j].number}
                    {/if}
                </button>
            {:else}
                <button class = "tablink" type="button" on:click={()=>selectSection(j)}>
                    {#if sectionlist[j].title !== ''}
                        {sectionlist[j].title}
                    {:else}
                        {sectionlist[j].number}
                    {/if}
                </button>
            {/if}
            {/each}
            <button class = "tablink" type="button" on:click|preventDefault={addSection}>+</button>


        </div>
        {#each sectionlist as x, j}
        {#if status[j] === "inline"}
            <div class = "sectioncontent">
                {#if sectionlist.length > 1}
                    <div class = "titleelement">
                        <label>
                            <input class = "sectiontitle" type = "text" placeholder = "section title" id = "user" name="user" bind:value = {sectionlist[j].title} required minlength = 1 size = 10/>
                        </label>
                        {#if sectionlist.length !== 1}
                        <button class = "remove" type= "button" on:click={()=>removeSection(j)}>x</button>
                        {/if}
                    </div>
                {/if}
                <h3>ingredients</h3>
                {#each sectionlist[j].ingredients as a, i}
                    <div class = "element ingredient">
                            <input class = "text" type = "text" id = {i} placeholder="name of ingedient" name="name" bind:value = {sectionlist[j].ingredients[i].name} required minlength = 1 size = 20
                            />
                            <input class = "text" type = "text" id = {i} placeholder = "amount of ingredient" name="amount" bind:value = {sectionlist[j].ingredients[i].amount} required minlength = 1 size = 20
                            />
                    </div>
                {/each}

                <div class = "element">
                    <button type= "button" on:click|preventDefault = {() => addIngredient(j)}>+</button>
                    <button type= "button" on:click = {() => removeIngredient(j)}>-</button>
                </div>

                {#if sectionlist.length > 0}
                <h3>section notes</h3>
                {#each sectionlist[j].steps as s, i}
                <div class = "stepelement">
                    <label>
                        {sectionlist[j].steps[i].number} .
                        <textarea class = "text alt" id = {i} name="action" bind:value = {sectionlist[j].steps[i].action} minlength = 1 size = 20/>
                    </label>
                </div>
                {/each}

                <div class = "element">
                    <button type= "button" on:click|preventDefault = {() => addStep(j)}>+</button>
                    {#if sectionlist[j].steps.length !== 0}
                    <button type= "button" on:click = {() => removeStep(j)}>-</button>
                    {/if}
                </div>
            {/if}

            </div>
            {/if}
        {/each}
        <h3>instructions</h3>
        {#each recsteplist as r, i}
        <div class = "stepelement">
            <label>
                {recsteplist[i].number} .
                <textarea class = "text" id = {i} name="action" bind:value = {recsteplist[i].action} required minlength = 1 size = 20/>
            </label>
        </div>
        {/each}

        <div class = "element">
            <button type= "button" on:click|preventDefault = {addRecStep}>+</button>
            <button type= "button" on:click = {removeRecStep}>-</button>
        </div>

        
        <input type = "hidden" name = "compiledrecipe" id = "compiledrecipe" value = {JSON.stringify(compiledrecipe)}>
        <button>
            update recipe
        </button>
    </form>
    </div>
</div>

<style>
    input.text {
        background:none;
        border-style: none;
        padding: .2rem;
        text-align: center;
        /* font-style: italic; */
	    font-weight:lighter;
        font-size: 19px;
        font-family: comic-sans;
        color: var(--text-color)
       
    }

    input.sectiontitle{
        background:none;
        border-style: none;
        padding: .2rem;
        text-align: center;
        /* font-style: italic; */
	    font-weight:lighter;
        font-size: 24px;
        font-family: comic-sans;
        color: var(--text-color)
    }

    input.title {
        margin-top: .5rem;
        background-color: none;
        border-style:none;
        padding: .2rem;
        text-align: center;
        /* font-style: italic; */
	    font-weight:lighter;
        font-size: 24px;
        font-family: comic-sans;
        color: var(--text-color);
        background-color: var(--input-color);
       
    }

    textarea.text {
        background-color: var(--input-color);
        border-style: none;
        padding: .2rem;
        /* font-style: italic; */
	    font-weight:lighter;
        font-size: 17px;
        font-family: comic-sans;
        color: var(--text-color)
       
    }
    input.title:focus {
        outline:none;
    }
    input.sectiontitle:focus {
        outline:none;
    }
    input.text:focus {
        outline:none;
    }

    textarea.text:focus {
        outline:none;
    }

    textarea.alt {
        background-color: var(--input-alt-color);
    }

    div.element {
        margin-top: .5em;
        margin-bottom: .5em;
        line-height: 1;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
    }

    div.stepelement {
        margin-top: .5em;
        margin-bottom: .5em;
        line-height: 1;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        font-style: italic;
	    font-weight: lighter;
        font-family: comic-sans;
        color: var(--steplabel-color);

    }


    div.ingredient > input {
        width: 10rem;
        margin: .5rem;
        margin-top: .5em;
        margin-bottom: .5em;
    }

    div.titleelement {
        margin-top: .5em;
        margin-bottom: .5em;
        line-height: 1;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
    }


    div.sectioncontent {
        margin-bottom: .5em;
        padding-top: .5em;
        padding-bottom: .5em;
        border-style: hidden;
        border-width: 1px;
        border-color: black;
        background-color: var(--section-color);
    }

    div.submit {
        margin: 2em;
        margin-top:0;
    }

    @media (max-width: 500px) {
	    div.submit {
		    margin: .3rem;
	    }	
    }


    div.usertag {
        font-size: 16px;
    }
    div.tab {
        margin-bottom: 0em;
    }

    button.tablink {
        background-color: var(--background-color);
        padding: .6rem;
        border-style: hidden;
        border-width:1px;
        border-color:black;
        margin-bottom: 0em;
    }

    button.remove {
        background-color: var(--removebg-color);
        color: var(--remove-color);
        padding-left: .5rem;
        padding-right: .5rem;
        padding-top: .2rem;
        padding-bottom: .2rem;
    }


    /* p.notes {
        display: flex;
        flex-wrap: wrap;
        font-size: 15px;
        text-align: center;
        max-width: 20rem;
        margin:auto;
    } */

    h3 {
        margin-bottom: 0;
        margin-top: 0;
    }

    h2 {
        margin-top: 0;
        margin-bottom: 0;
        color: var(--text-color);
    }
</style>