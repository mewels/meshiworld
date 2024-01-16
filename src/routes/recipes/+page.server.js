import {listAll} from '$lib/server/database.js';
import {searchName} from '$lib/server/database.js';
import {searchIngredient} from '../../lib/server/database';


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
        const results = await searchIngredient(data.get("searchkey"))
        return {
            results: results
        };
    },

    nsearch: async ({request}) => {
        const data = await request.formData();
        const results = await searchName(data.get("searchkey"))
        return {
            results: results
        };
    },
}