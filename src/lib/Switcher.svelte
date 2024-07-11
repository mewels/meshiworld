<script>
	import { onMount, onDestroy } from "svelte";
    import { theme } from '../stores.js'


    let visible = false;
    let widget = false;
    let themename;

    // const unsubscribe = theme.subscribe((value) => {
	// 	// localStorage.setItem("theme", value);
    //     themename = value;
	// });

    onMount (() => {
        document.querySelector("body").classList=[{$theme}]
        widget = true;
	})

    // onDestroy(unsubscribe)

    const toggleList = () => {
        console.log(visible)
        visible = !visible;
    }

    function selectElement(argument) {
        localStorage.setItem("theme",argument)
        $theme = argument;
        toggleList()
    }
</script>


<body>
    <form>
        <!-- <select name="theme">
            <option>latte</option>
            <option>matcha</option>
            <option>water</option>
            <option>puerh</option>
        </select> -->
        <!-- {console.log(selectedValue)}; -->

        <div class = "switch">
            {#if visible && widget}
            <ul class = "optionlist">
                <li on:click={()=>selectElement("latte")} class = "option latte">latte</li>
                <li on:click={()=>selectElement("matcha")} class = "option matcha">matcha</li>
                <li on:click={()=>selectElement("water")} class = "option water">water</li>
                <li on:click={()=>selectElement("puerh")} class = "option puerh">puerh</li>
            </ul>
            {/if}

            <span on:click={toggleList} class = "value">{$theme}</span>
        </div>
    </form>
</body>

<style>
    .switch {
        position: relative;
        display: inline-block;
        font-family: pixelify;
        box-sizing: border-box;
        /* padding-bottom:.1em;
        padding-top: .1em;
        padding-left: .3em;
        padding-right: 1.5em; */
        font-size: 25px;
        width: 6em; 
        background-color: var(--section-color);
        border: 2px solid var(--section-color);
    }

    .value {
        padding-bottom:.1em;
        padding-top: .1em;
        padding-left: .3em;
        padding-right: 1.5em;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* .switch active,.switch:focus {
        outline-color:transparent;
    } */

    .switch .optionlist {
        position: absolute;
        bottom: 100%;
        left: 0;
        background-color: var(--section-color);
    }

    /* .switch .optionlist.hidden {
        max-height: 0;
        visibility: hidden;
    } */


    .switch .value {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: bottom;
    }


    .switch .optionlist {
        list-style: none;
        margin: 0;
        margin-bottom: 10px;
        padding: 0;

        box-sizing: border-box;


        min-width: 100%;


        max-height: 30em; /* 100px */
        overflow-y: auto;
        overflow-x: hidden;

        border-top-width: 0.1em;
        background: var(--background-color);
    }

    li {
        margin-bottom: .5em;
        padding-left: .3em;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select:none;
    }

/* 
    li.latte {
        background-color: #f8eed9;
        color: #3a3221;
    }

    li.matcha {
        background-color: #d1e6b0;
        color: #1d3d0e;
    } 

    li.water {
        background-color: #eff7fa;
        color: #0a2530;
    } 

    li.puerh {

        margin-bottom: .5em;
    } */



</style>