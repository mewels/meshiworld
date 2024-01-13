import * as db from '$lib/server/database.js';

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

    isearch: async ({request}) => {
        const data = await request.formData();
        db.searchIngredient(data.get("ingredient"));
    },

    search: async ({request}) => {
        const data = await request.formData();
        console.log("Name search");
        db.searchName(data.get("name"));
        console.log("Ingredient search");
        db.searchIngredient(data.get("name"));
    },
}   
