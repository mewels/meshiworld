import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()

// OLD Functions
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

// PRISMA FUNCTIONS
export async function addRecipe(recipe) {
    const recipeobject = JSON.parse(recipe);
    await db.recipe.create({ 
        data: {
            name: recipeobject.name.toLowerCase(),
            ingredients: {create: recipeobject.ingredients},
            steps: {create: recipeobject.steps},
        }})
}

export async function deleteAll() {
    await db.ingredient.deleteMany({});
    await db.step.deleteMany({});
    await db.recipe.deleteMany({});
}

export async function deleteRecipe(id) {
    const delId = await db.recipe.select({
        where: {
            id: id,
        },
    })

    await db.recipe.delete({
        where: {
            id: delId,
        },
    })

    await db.ingredient.deleteMany({
        where: {
            recipeId: delId,
        },
    })

    await db.step.deleteMany({
        where: {
            recipeId: delId,
        },
    })
}

export async function searchName(arg) {
    const recipes = await db.recipe.findMany({
        where: {
            name: {
                contains: arg,
            },
        },
        include: {
            ingredients: true,
            steps: true,
        },
    })
    console.log(recipes);
    for (const r of recipes) {
        console.log(JSON.stringify(r))
    }
}

export async function listAll() {
    const recipes = await db.recipe.findMany({});
    return recipes;
}

export async function getRecipe(id) {
    const recipe = await db.recipe.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            steps: true,
        },
    })
    return recipe;
}