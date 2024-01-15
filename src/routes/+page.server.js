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

    delete: async () => {
        db.deleteAll();
    },

    list: async () => {
        db.listRecipes();
    },

    isearch: async ({request}) => {
        const data = await request.formData();
        db.searchIngredient(data.get("ingredient"));
    },

    search: async ({request}) => {
        const data = await request.formData();
        console.log("Name search");
        db.searchName(data.get("name"));
        // console.log("Ingredient search");
        // db.searchIngredient(data.get("name"));
    },
}   
