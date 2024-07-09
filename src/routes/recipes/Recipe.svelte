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

            <h3>steps</h3>

            <ol class = 'steps'>
                {#each section.steps as step}
                    <li>
                        {step.action}
                    </li>
                {/each}
            </ol>
        </div>
        {/if}
    {/each}

    <h3>Instructions</h3>
    <ol class = 'steps'>
        {#each recsteplist as recstep}
            <li>
                {recstep.action}
            </li>
        {/each}
    </ol>



    
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
        white-space:pre-wrap;
    }
    h2 {
        margin-bottom: 0;
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