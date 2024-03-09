<script>
    export let pageuser;
    export let recipes;
    export let allrecipes;
    export let allusers;
    export let sessionuser;

    let recipeid = null;
</script>
<div class="User">
    <h2>{pageuser}'s page :)</h2>


    <div class = 'recipelist'>
        <h3>my recipes</h3>
        {#each recipes as {id, name}}
            <li><a href="/recipes/{id}" data-sveltekit-preload-data>{name}</a></li>
        {/each}
    </div>

    {#if sessionuser === 'mara' && sessionuser === pageuser}
        <form method ='POST' action="?/claim">
            <label>
                <select name = "recipeid">
                    {#each allrecipes as {id, name}}
                    <option value = {id}>{name}</option>
                    {/each}
                </select>
            </label>

            <label>
                <select name = "userid">
                    {#each allusers as {id, username}}
                    <option value = {id}>{username}</option>
                    {/each}
                </select>
            </label>
            <button>
                do it!
            </button>
        </form>
    {/if}


    {#if sessionuser && sessionuser === pageuser}
        <form method='POST' action="?/logout">
            <button>
                logout
            </button>
        </form>
    {/if}


</div>

<style>
    li {
        list-style-type: none;
        padding-left: 0px;
    }

    div.recipelist {
        padding-bottom: 3rem;
    }
</style>