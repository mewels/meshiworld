<script>
    import {page} from '$app/stores';
    import InfoHead from "$lib/InfoHead.svelte";
    import {dev} from '$app/environment';

    let name = '';
    let pass = '';
    export let form;
    export let data;
</script>

<InfoHead pagedescription = '^ ____ ^' pagetitle = 'bagelzone' pageurl = {$page.url}/>

<div>
    <form method='POST' action = "?/login">
        <div class = "element">
            <label>
                <input class ="text" type = "text" placeholder = "username" id = "name" name="name" bind:value = {name} pattern = "\w+" required = "true" minlength = 1 size = 20 list = ''/>
            </label>
        </div>

        <div class = "element">
            <label>
                <input class ="text" type = "password" placeholder = "password" id = "pass" name="pass" bind:value = {pass} required = "true" minlength = 1 size = 20/>
            </label>
        </div>
        
        <button>
            log in
        </button>
    </form>
    
    {#if data.sessionuser}
        <form method='POST' action="?/logout">
            <button>
                logout
            </button>
        </form>
    {/if}

    {#if dev}
        <form method='POST' action="?/delete">
            <button>
                delete all users
            </button>
        </form>
    {/if}

    <div style="text-align:center"> need an account?</div> 
    <div class = "element">
        <a href="/register">sign up here</a>
    </div>


    {#if form}
		{form?.message ?? 'something went wrong'}
	{/if}
</div>

<style>
    div.element {
        margin-top: .5em;
        margin-bottom: .5em;
        line-height: 1;
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
    }
    
    input.text {
        background:none;
        border-style: none;
        padding: .2rem;
        text-align: center;
        font-style: italic;
	    font-weight:lighter;
        font-size: 25px;
        font-family: pixelify;
        color: var(--text-color)
    }

    input.text:focus {
        outline:none;
    }
</style>