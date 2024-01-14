import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()

let count = 0;

// const db = new Map();

// recipes are stored in db as id, JSON string(recipe)

export function listRecipes() {
    for (const [k, v] of db) {
        const vparse = JSON.parse(v);
        console.log('[',k,']: ', vparse);
    }
}

export function getRecipe(id) {
    for (const k of db.keys()) {
        if (k === id) {
            return JSON.parse(db.get(id));
        }
    }
    return 'invalid id';
}

// OLD addRecipe for local db Map()
// export function addRecipe(recipe) {
//     db.set(
//         generateID(db),
//         recipe
//     )
// }
export async function deleteRecipe(id) {
    await db.recipe.delete({
        where: {
            objid: id,
        }
    })
    // const deletei = await db.ingredient.delete({
    //     where: {
    //         id: id,
    //     }
    // })
}
export async function deleteAll() {
    await db.ingredient.deleteMany({});
    await db.step.deleteMany({});
    await db.recipe.deleteMany({});
}

export async function addRecipe(recipe) {
    const recipeobject = JSON.parse(recipe);
    count = count+1;
    const myid = count;
    await db.recipe.create({ 
        data: {
            objid: myid,
            name: recipeobject.name,
            ingredients: {create: recipeobject.ingredients},
            steps: {create: recipeobject.steps},
        }})
}

export function searchName(arg) {
    for (const k of db.keys()) {
        const recipe = getRecipe(k);
        if (recipe.name.toLowerCase().includes(arg.toLowerCase())) {
            console.log('[',k,']: ', recipe.name);
        }
    }
}

export function searchIngredient(arg) {
    for (const k of db.keys()) {
        const recipe = getRecipe(k);
        for (const [n, a] of Object.entries(recipe.ingredients)) {
            if (a.name.toLowerCase().includes(arg.toLowerCase())) {
                console.log('[',k,']: ', recipe.name);
            }
        }
    }
}

export function generateID(pmap){;
    return (pmap.size+1);
}

export function clearRecipes() {
    db.clear();
}
