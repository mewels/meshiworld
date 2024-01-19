import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
};

// PRISMA FUNCTIONS
export async function addRecipe(recipe) {
    const recipeobject = JSON.parse(recipe);
    await db.recipe.create({ 
        data: {
            name: recipeobject.name.toLowerCase(),
            user: recipeobject.user.toLowerCase(),
            notes: recipeobject.notes.toLowerCase(),
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
            OR: [
                {
                    name: {
                        contains: arg.toLowerCase(),
                    },
                },
                {
                    name: {
                        contains: arg.toTitleCase(),
                    },
                },
                {
                    name: {
                        contains: arg.toUpperCase()
                    }
                },
            ],
        },
        // include: {
        //     ingredients: true,
        //     steps: true,
        // },
    })
    
    // for (const r of recipes) {
    //     console.log(JSON.stringify(r))
    // }
    return recipes;
}

export async function searchIngredient(arg) {
    let recipes = [];
    const ingredients = await db.ingredient.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: arg.toLowerCase(),
                    },
                },
                {
                    name: {
                        contains: arg.toTitleCase(),
                    },
                },
                {
                    name: {
                        contains: arg.toUpperCase()
                    }
                },
            ],
        },
    })

    for (const i of ingredients) {
        const r = await getRecipe(i.recipeId);
        recipes.push(r);
    }
    return recipes;
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