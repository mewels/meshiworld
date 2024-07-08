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

    <h3>sections</h3>
    {#each seclist as section}
        <!-- {console.log(seclist)} -->
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
</style>