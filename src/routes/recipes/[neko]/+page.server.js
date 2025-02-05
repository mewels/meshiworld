import {getRecipe, deleteRecipe, getUser} from '$lib/server/database.js';
import { error, redirect } from '@sveltejs/kit';


export async function load({params}) {
    const recipe = await getRecipe(params.neko);
    return {
        recipe: recipe
    };
}

export const actions = {
    delete: async({cookies, params}) =>
    {
        const recipe = await getRecipe(params.neko);
        const auth = cookies.get("Authorization");

        if (auth)
        {
            const splitAuth = auth.split(':');
            const cuser = splitAuth[0]
            const logUser = await getUser(cuser);

            if(logUser.id == recipe.userId)
            {
                await deleteRecipe(params.neko);
                throw redirect(303, '/recipes/')
            }
            else
            {
                error(404, "You are not authorized to delete this recipe")
                throw redirect(303, '/recipes/'+ recipe.id)
            }
        }
        else 
        {
            error(401, "You are not authorized to delete this recipe")
            throw redirect(303, '/recipes/'+ recipe.id)
        }
    },

    edit: async({cookies, params}) => {

        const auth = cookies.get("Authorization");
        const recipe = await getRecipe(params.neko);

        if(auth)
        {
            const splitAuth = auth.split(':');
            const cuser = splitAuth[0]
            const logUser = await getUser(cuser);
            if (logUser.id == recipe.userId)
            {
                const recipe = await getRecipe(params.neko);
                throw redirect(303, '/recipes/'+ recipe.id +'/edit')
            }
            else 
            {
                error(404, "You are not authorized to edit this recipe")
            }
        }
        else
        {
            error(401, "You are not authorized to edit this recipe")
        }
    }
}