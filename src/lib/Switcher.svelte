<script>
	import { onMount, onDestroy } from "svelte";
    import { theme } from '../stores.js'


    let visible = false;
    let widget = false;
    let render = false;
    let rendersymbol = "<"
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

    // const toggleRender = () => {
    //     render = !render;
    //     if (render)
    //     {
    //         rendersymbol = ">"
    //     }
    //     else {
    //         rendersymbol = "<"
    //     }
    // }
    
    // function keyRender(event) {
    //     console.log(event.key)
    //     if (event.key === "Enter")
    //     {
    //         render = !render;
    //         if (render)
    //         {
    //             rendersymbol = ">"
    //         }
    //         else {
    //             rendersymbol = "<"
    //         }
    //     }
    //     if (event.key === "ArrowRight")
    //     {
    //         document.querySelector("span.value").focus();
    //     }
    // }

    const toggleList = () => {
        visible = !visible;
    }

    function keyToggle(event){
        if(event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Tab")
        {
            document.querySelector("li.puerh").focus()
        }
        if(event.key === "Enter")
        {
            visible = !visible;
        }
    }

    function selectElement(argument) {
        localStorage.setItem("theme",argument)
        $theme = argument;
        toggleList()
    }

    function keyElement(event, argument) {
        if (event.key === "Enter") {
            localStorage.setItem("theme",argument)
            $theme = argument;
            toggleList()
        }
        if (argument === "puerh" && event.key === "ArrowUp")
        {
            // focus water
            document.querySelector("li.water").focus()
        }
        if (argument === "puerh" && event.key === "ArrowDown")
        {
            // focus chai
            document.querySelector("li.chai").focus()
        }
        if (argument === "water" && event.key === "ArrowUp")
        {
            // focus matcha
            document.querySelector("li.matcha").focus()
        }
        if (argument === "water" && event.key === "ArrowDown")
        {
            // focus puerh
            document.querySelector("li.puerh").focus()
        }
        if (argument === "matcha" && event.key === "ArrowUp")
        {
            // focus chai
            document.querySelector("li.chai").focus()
        }
        if (argument === "matcha" && event.key === "ArrowDown")
        {
            // focus water
            document.querySelector("li.water").focus()
        }
        if (argument === "chai" && event.key === "ArrowUp")
        {
            // focus puerh
            document.querySelector("li.puerh").focus()
        }
        if (argument === "chai" && event.key === "ArrowDown")
        {
            // focus matcha
            document.querySelector("li.matcha").focus()
        }
    }
</script>


<div class = "wrapper">
    <form>

        <!-- <span class = "rendertoggle" on:keypress={keyRender} on:click={toggleRender} tabindex = "0">{rendersymbol}</span> -->
        <!-- {#if render} -->

            <div class = "switch">
                {#if visible && widget}
                    <ul class = "optionlist">
                        <li on:keydown={(event)=>keyElement(event, "chai")} on:click={()=>selectElement("chai")} class = "option chai" tabindex ="0" >chai</li>
                        <li on:keydown={(event)=>keyElement(event, "matcha")} on:click={()=>selectElement("matcha")} class = "option matcha" tabindex ="0">matcha</li>
                        <li on:keydown={(event)=>keyElement(event,"water")} on:click={()=>selectElement("water")} class = "option water" tabindex ="0" >water</li>
                        <li on:keydown={(event)=>keyElement(event,"puerh")} on:click={()=>selectElement("puerh")} class = "option puerh" tabindex ="0" >puerh</li>
                    </ul>
                    {/if}
                    <span role = "switch" aria-checked="true" on:keydown={keyToggle} on:click={toggleList} class = "value" tabindex="0">{$theme}</span>

            </div>

        <!-- {/if} -->
    </form>
</div>

<style>
    .switch {
        position: relative;
        display: inline-block;
        font-family: pixelify;
        box-sizing: border-box;
        font-size: 25px;
        width: 6em; 
        background-color: var(--section-color);
        border: 2px solid var(--section-color);
    }

    .value {
        padding-bottom:.1em;
        padding-top: .1em;
        padding-left: .3em;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .wrapper {
        gap:0;
    }

    /* .rendertoggle
    {
        padding-bottom:.25em;
        padding-top: .65em;
        padding-left: .1em;
        padding-right: .1em;
        background-color: var(--section-color);
        border: 2px solid var(--section-color)
        align-items: center; 
    } */

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
        position: absolute;
        bottom: 100%;
        left: 0;
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
        /* background: var(--background-color); */
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
    li.chai {
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