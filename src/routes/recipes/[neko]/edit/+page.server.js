import {getRecipe} from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';
import * as db from '$lib/server/database.js';

export async function load({params}) {
    const recipe = await getRecipe(params.neko);
    return {
        recipe: recipe
    };
}

export const actions = {
    update: async({request,params}) => {
        const data = await request.formData();
        const recipe =  data.get("compiledrecipe");
        const getid = await getRecipe(params.neko);
        await db.updateRecipe(recipe);
        throw redirect(303, '/recipes/'+getid.id)
    }
}