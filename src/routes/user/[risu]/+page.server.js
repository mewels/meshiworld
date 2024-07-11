import {getUser} from '$lib/server/database.js';
import * as db from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';
import { getUserRecipes, listAll, listAllUsers } from '../../../lib/server/database.js';


export async function load({params}) {
    const user = await getUser(params.risu);
    const allrecipes = await listAll();
    const allusers = await listAllUsers();
    const recipes = await getUserRecipes(params.risu);
    return {
        username: user.username,
        recipes: recipes,
        allrecipes: allrecipes,
        allusers: allusers
    };
}

export const actions = {
    claim: async ({request}) => {
        const data = await request.formData();
        const recipeid = data.get("recipeid");
        const userid = data.get("userid");
        await db.claimRecipe(userid,recipeid);
    },

    delete: async() => {
        await db.deleteAll();
    },

    logout: async ({cookies,locals}) => {
        cookies.delete("Authorization", {path: '/'});
        locals.user = null;
        throw redirect(303, '/login')
    }
}