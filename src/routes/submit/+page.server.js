import * as db from '$lib/server/database.js';
import {listAll} from '$lib/server/database.js';

export async function load() {
    const recipes = await listAll();
    return {
        recipes: recipes
        };
}

export const actions = {
    clear: async () => {
        db.clearRecipes();
    },
    
    create: async ({request}) => {
        const data = await request.formData();
        const recipe = data.get("compiledrecipe");
        // console.log(recipe);
        db.addRecipe(recipe);
    },

    list: async () => {
        db.listRecipes();
    },
}   
