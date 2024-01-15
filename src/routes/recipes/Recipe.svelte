<script>
    export let name = '';
    export let ilist = [];
    export let slist = [];
</script>

<div class = 'recipe'>
    <h1>{name}</h1>

    <h3>Ingredients</h3>
    <ul class = 'ingredients'>
        {#each ilist as ingredient}
            <li>
                {ingredient.name} : {ingredient.amount}
            </li>
        {/each}
    </ul>

    <h3>Steps</h3>

    <ol class = 'steps'>
        {#each slist as step}
            <li>
                {step.action}
            </li>
        {/each}
    </ol>

<a href="../recipes/">back to all recipes</a>
</div>

<style>
    h1 {
        text-align: center;
    }

    h3 {
        text-align: center;
    }
</style>