import * as db from '$lib/server/database.js';
import {listAll} from '$lib/server/database.js';
import { fail } from '@sveltejs/kit'

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
        let recipe =  data.get("compiledrecipe");

        const temp = JSON.parse(recipe)

        for (const section of temp.sections)
        {  
            for (const step of section.steps) {
                console.log("should be here")
                console.log(section)
                if (step.action === '' || step.action === "") {
                    section.steps.splice(step.number-1,1)
                    let index = 1
                    for (const s of section.steps){
                        s.number = index;
                        index++;
                    }
                }

            }
        }

        recipe = JSON.stringify(temp)
        try {
            await db.addRecipe(recipe);
        } catch(error) {
            console.error(error)
            return fail(500, {message: 'could not save recipe'});
        }
    },

    list: async () => {
        db.listRecipes();
    },
}   
