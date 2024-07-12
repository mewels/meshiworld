import {getRecipe} from '$lib/server/database.js';
import { redirect, fail } from '@sveltejs/kit';

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
                if (temp.sections.length > 1 && (section.title === '' || section.title === "")) {
                    return fail(400, {index : section.number-1, missing: true,message: "please fill out all required fields"})
                }
    
                for (const ingredient of section.ingredients)
                {
                    if ((ingredient.name === '' || ingredient.amount === '') || (ingredient.name === "" || ingredient.amount === "")) {
                        return fail(400, {index : section.number-1, missing: true,message: "please fill out all required fields"})
                    }
                }
                for (const step of section.steps) {
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
    
            for (const recstep of temp.recsteps) 
            {
                if (recstep.action === '' || recstep.action === "") {
                    return fail(400, {index : recstep.number-1, missing: true,message: "please fill out all required fields"})
                }
            }

        recipe = JSON.stringify(temp)


        await db.updateRecipe(recipe);
        throw redirect(303, '/recipes/'+getid.id)
    }
}