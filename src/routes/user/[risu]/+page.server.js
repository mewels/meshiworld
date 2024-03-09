import {getUser} from '$lib/server/database.js';
import { redirect } from '@sveltejs/kit';
import { getUserRecipes } from '../../../lib/server/database.js';


export async function load({params}) {
    const user = await getUser(params.risu);
    const recipes = await getUserRecipes(params.risu);
    return {
        username: user.username,
        recipes: recipes
    };
}

export const actions = {
    logout: async ({cookies,locals}) => {
        cookies.delete("Authorization", {path: '/'});
        locals.user = null;
        throw redirect(303, '/login')
    }
}