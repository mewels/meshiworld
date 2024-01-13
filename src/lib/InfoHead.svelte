<script>
export let pagedescription = 'a page';
export let pagetitle = 'a title';
export let pageurl ='a url';

export let ogprops = [
    {property : 'og:title', content : pagetitle},
    {property : 'og:type', content : 'website'},
    {property : 'og image', content : 'white' },
    {property : 'og:url', content : pageurl},
    {property : 'og:description', content : pagedescription}
];

export let twtprops = [
    {name : 'twitter:card', content : 'summary'},
    {name : 'twitter:description', content : pagedescription},
];
</script>

<svelte:head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content={pagedescription}>

    <!-- og stuff-->
    {#each ogprops as ogprop}
    <meta property={ogprop.property} content={ogprop.content}>
    {/each}

    <!-- twt stuff-->
    {#each twtprops as twtprop}
    <meta name={twtprop.name} content={twtprop.content}>
    {/each}

    <title>{pagetitle}</title>


</svelte:head>