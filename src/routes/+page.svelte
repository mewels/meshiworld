<script>
    import {page} from '$app/stores'
    import InfoHead from "$lib/InfoHead.svelte";
    import Nav from './Nav.svelte';
</script>

<body>
    <InfoHead pagedescription = '^ ____ ^' pagetitle = 'bagelzone' pageurl = {$page.url}/>

    <Nav></Nav>
</body>