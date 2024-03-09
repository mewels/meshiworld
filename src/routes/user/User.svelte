<script>
    export let sessionuser;
    export let recipes;
</script>
<div class="User">
    <h2>{sessionuser}'s page :)</h2>


    <div class = 'recipelist'>
        <h3>my recipes</h3>
        {#each recipes as {id, name}}
            <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
        {/each}
    </div>


    {#if sessionuser}
        <form method='POST' action="?/logout">
            <button>
                logout
            </button>
        </form>
    {/if}


</div>

<style>

</style>