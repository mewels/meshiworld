<script>
    export let id = '';
    export let value = ''
    export let amount = ''
</script>

{#if id == 'ingredient'}
<p>
    <label for = "{id}">{id}: </label>
    <input type = "text" id = "{id}" name="{id}" bind:value = {value} required minlength = 1 size = 20/>
    <label for = "amount">amount: </label>
    <input type = "text" id = "amount" name="amount" bind:value = {amount} required minlength = 1 size = 20/>

    <input class = "remove" type = "button" value = "delete ingredient"/>
</p>

<div class = "addbutton">
    <input class = "add" type = "button" value = "add ingredient"/>
</div>

{:else if id == 'step'}
<p>
    <label for = "{id}">{id}: </label>
    <input type = "text" id = "{id}" name="{id}" bind:value = {value} required minlength = 1 size = 20/>
    <input class = "remove" type = "button" value = "delete step"/>
</p>

<div class = "addbutton">
    <input class = "add" type = "button" value = "add step"/>
</div>

{:else if id == 'name'}
<p>
    <label for = "{id}">{id}: </label>
    <input type = "text" id = "{id}" name="{id}" bind:value = {value} required minlength = 1 size = 20/>
</p>
{:else}
<p>
    Invalid id
</p>
{/if}

<style>
    label {
        text-transform: capitalize;
    }

    div.addbutton {
        text-align: center;
    }

    p {
        margin: 2em;
    }
</style>