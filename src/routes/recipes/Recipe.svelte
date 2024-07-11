<script>
    export let name = '';
    export let user = '';
    export let notes = '';
    export let seclist = [];
    export let recsteplist = [];
    export let userid;
    
    let status = ["inline"];

    function selectSection(j) {
        status.fill("none");
        status[j] = "inline";
    }
</script>

<div class = 'recipe'>
    <h2>{name}</h2>
    {#if userid}
    <header class = "user">submitted by 
        <a href = "https://meshi.world/user/{user}">{user}
        </a></header>
    {:else}
    <header class = "user">submitted by {user === '' ? 'anon' : user}</header>
    {/if}
    {#if notes !== ''}
        <h3>notes</h3>
        <div class = "notes">
            <p> 
                    {notes}
            </p>
        </div>
    {/if}

    <div class = "tab">
        {#each seclist as x,j}
        {#if status[j] === "inline"}
            <button class = "tablink" style="background-color:var(--section-color);" type="button" on:click={()=>selectSection(j)}>
                {#if seclist[j].title !== ''}
                    {seclist[j].title}
                {:else}
                    {seclist[j].number}
                {/if}
            </button>
        {:else}
            <button class = "tablink" type="button" on:click={()=>selectSection(j)}>
                {#if seclist[j].title !== ''}
                    {seclist[j].title}
                {:else}
                    {seclist[j].number}
                {/if}
            </button>
        {/if}
        {/each}
    </div>
    {#each seclist as section, j}
    {#if status[j] === "inline"}
        <div class = "sectioncontent">
            <h3>ingredients</h3>
            <ul class = 'ingredients'>
                {#each section.ingredients as ingredient}
                    <li>
                        {ingredient.name} : {ingredient.amount}
                    </li>
                {/each}
            </ul>

            {#if section.steps.length > 0}
            <h3 class = "sectionnotes ">section notes</h3>
            <ul class = 'sectionnotes'>
                {#each section.steps as step}
                <li>
                    <div>
                        {step.action}
                    </div>
                </li>
                {/each}
                </ul>
            {/if}
        </div>
        {/if}
    {/each}

    <h3>instructions</h3>
    <div class = 'steps'>
        {#each recsteplist as recstep}
            {recstep.number} .  {recstep.action}
        {/each}
    </div>



    
</div>

<style>
    header.user {
        margin-top: 0;
        font-weight: 25;
        font-size: 16px;
        text-align: center;
    }
    .notes {
        white-space: pre-wrap;
        margin-left: 4rem;
        margin-right: 4rem;
    }

    .steps {
        text-align: center;
        white-space:pre-wrap;
        border-style: none;
        padding: .2rem;
        /* font-style: italic; */
	    font-weight:lighter;
        font-size: 20px;
        font-family: pixelify;
        color: var(--text-color);
        /* margin-right: 5rem; */

    }

    ul {
        margin-top:0;
        list-style: symbols("--  ");
        text-align: center;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
    }

    ul.sectionnotes {
        list-style-type: symbols("--  ");
        text-align: center;
        white-space:pre-wrap;
        border-style: none;
        padding: .2rem;
        /* font-style: italic; */
	    font-weight:lighter;
        font-size: 20px;
        font-family: pixelify;
        color: var(--text-color);
        /* margin-right: 5rem; */
    }
    h2 {
        margin-bottom: 0;
        color:var(--text-color);
    }
    h3 {
        margin-top:0;
        margin-bottom:0;
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

    div.recipe {
        margin:2rem;
        margin-top:0;
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

</style>