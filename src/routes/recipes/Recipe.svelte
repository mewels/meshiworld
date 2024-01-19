<script>
    export let name = '';
    export let user = '';
    export let notes = '';
    export let ilist = [];
    export let slist = [];
</script>

<div class = 'recipe'>
    <h2>{name}</h2>
    <header class = "user">submitted by {user === '' ? 'anon' : user}</header>

    {#if notes !== ''}
        <h3>notes</h3>
        <div class = "notes">
            <p> 
                    {notes}
            </p>
        </div>
    {/if}


    <h3>ingredients</h3>
    <ul class = 'ingredients'>
        {#each ilist as ingredient}
            <li>
                {ingredient.name} : {ingredient.amount}
            </li>
        {/each}
    </ul>

    <h3>steps</h3>

    <ol class = 'steps'>
        {#each slist as step}
            <li>
                {step.action}
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
</style>