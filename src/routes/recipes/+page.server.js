import {listAll} from '$lib/server/database.js';

export async function load() {
    const recipes = await listAll();
    return {
        recipes: recipes
        };
}
