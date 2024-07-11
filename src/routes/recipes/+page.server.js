import {listAll} from '$lib/server/database.js';
import {searchName} from '$lib/server/database.js';
import {getUserRecipes, searchIngredient} from '../../lib/server/database';


export async function load() {
    const recipes = await listAll();
    return {
        recipes: recipes
        };
}

/** @type {import('./$types').Actions} */
export const actions = {
    isearch: async ({request}) => {
        const data = await request.formData();
        const results = await searchIngredient(data.get("searchkey").trim())
        return {
            results: results
        };
    },

    nsearch: async ({request}) => {
        const data = await request.formData();
        const results = await searchName(data.get("searchkey").trim())
        return {
            results: results
        };
    },

    usearch: async ({request}) => {
        const data = await request.formData();
        const results = await getUserRecipes(data.get("searchkey").trim())
        return {
            results: results
        };
    },
}