<script>
    import {page} from '$app/stores'
    import InfoHead from "$lib/InfoHead.svelte";
    import Nav from './Nav.svelte';
</script>

<InfoHead pagedescription = '^ ____ ^' pagetitle = 'bagelzone' pageurl = {$page.url}/>

<div>
    <div>
        <form method="POST" action='?/delete'>
            <label>
                <button>
                    delete delete delete
                </button> 
            </label>
        </form>
    </div>
</div>