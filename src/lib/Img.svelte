<script>
    export let link = 'image link';
    export let text = 'image text';
    
    export let image = {
        link : link,
        caption : text,
        alt : text
    };

</script>

<div class='galleryimage'>
    <img src={image.link} alt={image.alt} />
</div>
<div class='caption'>
    {image.caption}
</div>


<style>
    .galleryimage
    {
        display: flex;
        margin-bottom: 2rem;
        gap: 1rem;
        text-align: center;
    }

    img {
        max-width: 100%;
        height: 35%;
        width: 35%;
    }
    
    .caption {
        font-size: 30px;
        background-color: whitesmoke;
    }
</style>