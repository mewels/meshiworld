import {getRecipe} from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';

export async function load({params}) {
    const recipe = await getRecipe(params.neko);
    return {
        recipe: recipe
    };
}

export const actions = {
    edit: async({params}) => {
        const recipe = await getRecipe(params.neko);
        throw redirect(303, '/recipes/'+ recipe.id +'/edit')
    }
}