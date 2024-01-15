import {getRecipe} from '$lib/server/database.js';

export async function load({params}) {
    const recipe = await getRecipe(params.neko);
    return {
        recipe: recipe
    };
}