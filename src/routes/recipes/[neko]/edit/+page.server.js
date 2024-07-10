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
        let recipe =  data.get("compiledrecipe");
        const getid = await getRecipe(params.neko);

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


        await db.updateRecipe(recipe);
        throw redirect(303, '/recipes/'+getid.id)
    }
}