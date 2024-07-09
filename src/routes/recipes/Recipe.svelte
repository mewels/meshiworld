<script>
    export let name = '';
    export let user = '';
    export let notes = '';
    export let seclist = [];
    export let userid;
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

    {#each seclist as section}
        <!-- {console.log(seclist)} -->
        <h2>{section.title}</h2>
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
    {/each}


    
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

    div.sectioncontent {
        margin-top: .5em;
        margin-bottom: .5em;
        border-style: dotted;
        border-width: 1px;
        border-radius: 30px;
        border-color: black;
        background-color: rgba(255, 255, 255, 0.26)   
    }
</style>