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
    <br>
    {#if notes !== ''}
    <h3>notes</h3>
        <div class = "notes">
            {notes}
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
            <h3 style="margin-bottom:.5rem;">ingredients</h3>
            <!-- <div class = 'ingredients'> -->
                {#each section.ingredients as ingredient}
                    <div class = "ingredients">
                        <span class = "ingelement">{ingredient.name}</span> <span class = "ingelement>">:</span><span class = "ingelement">{ingredient.amount}</span>
                    </div>
                {/each}
            <!-- </div> -->

            {#if section.steps.length > 0}
            <br>
            <h3>section notes</h3>
            <div class = 'sectionnotes'>
                {#each section.steps as step}
                    <div>
                        {step.action}
                    </div>
                {/each}
            </div>
            {/if}
        </div>
        {/if}
    {/each}

    <h3>instructions</h3>
    <div class = 'steps'>
        {#each recsteplist as recstep}
        <div class = 'recstep'>
        {recstep.number} .  {recstep.action}
        <!-- <br> -->
        </div>
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
        margin-top: .3em;
        margin-bottom: 2em;
        text-indent: 5%;
        /* margin-left: 4rem; */
        /* margin-right: 4rem; */
        /* max-width: 4em; */
    }

    .steps {
        /* text-align: center; */
        /* white-space:pre-wrap; */
        word-wrap: break-word;
        margin-left: 1%;
        border-style: none;
        padding: .2rem;
	    font-weight:lighter;
        font-size: 20px;
    }

    .ingredients{ 
        text-align: center;
        padding: .1em;
        gap: 1em;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .ingredients:nth-child(even)
    {
        background-color: var(--section-alt-color);
    }

    .ingelement {
        display: inline-block;
        width: 10em;
        /* padding-bottom:.5em; */
        /* transform: translate(0,50%); */

    }

    .sectionnotes {
        text-align: center;
        white-space:pre-wrap;
        border-style: none;
        padding: .2rem;
        /* font-style: italic; */
	    font-weight:lighter;
        font-size: 20px;
        font-family: pixelify;
        color: var(--text-color);
        /* word-break: break-all; */
        /* margin-right: 5rem; */
    }
    .recstep {
        margin-bottom: .5em;
        /* word-wrap: break-word; */
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
        padding-bottom: 1em;
        border-style: hidden;
        border-width: 1px;
        border-color: black;
        background-color: var(--section-color);
        padding-left: 1em;
        padding-right: 1em;
    }

    div.recipe {
        margin: 2rem;
        margin-top:0;
    }

    @media (max-width: 500px) {
	div.recipe {
		margin: .3rem;
	}	
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