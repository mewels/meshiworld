import * as db from '$lib/server/database.js';
import {listAll} from '$lib/server/database.js';


// function trimEmpty(recipe) {
    
//     let n = 0;
//     for (const i in recipe.ingredients) {
//         if ((i.name === '') || (i.amount === '')) {
//             recipe = recipe.ingredients.slice(0,n);
//         }
//      n += 1;
//      console.log(JSON.stringify(recipe.ingredients));
//     }
//     let m = 0;
//     for (const s in recipe.steps) {
//         if (s.action === '') {
//             recipe == recipe.steps.slice(0,m);
//         }
//     m += 1;
//     }
//     return recipe;
// }

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
        const recipe =  data.get("compiledrecipe");

        // console.log(recipe);
        db.addRecipe(recipe);
    },

    list: async () => {
        db.listRecipes();
    },
}   
