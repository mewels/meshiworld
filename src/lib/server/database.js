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
            userId: recipeobject.userid,
        }})
}

export async function claimRecipe(userid, recipeid) {
    const tempuser = await getUserFromId(userid);
    await db.recipe.update({
        where: {
            id: Number(recipeid),
        },
        data: {
            user: tempuser.username,
            userId: Number(userid),
        },
    })
}

export async function createUser(user)
{
    const userobject = user;
    await db.siteUser.create({
        data: {
            username : userobject.name,
            password : userobject.password,
        }
    })
}

export async function deleteAll() {
    await db.ingredient.deleteMany({});
    await db.step.deleteMany({});
    await db.recipe.deleteMany({});
    await db.siteUser.deleteMany({});
}

export async function deleteUsers() {
    await db.siteUser.deleteMany({});
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

export async function getUser(arg) {
    const user = await db.siteUser.findMany({
        where: {
            username: {
                equals: arg,
                mode: 'insensitive',
            },
        },
    });
    return user;
}

export async function getUserFromId(arg) {
    const user = await db.siteUser.findFirst({
        where: {
            id: {
                equals: Number(arg),
            },
        },
    });
    return user;
}

export async function getUserRecipes(arg) {
    const recipes = await db.recipe.findMany({
        where: {
            user: {
                contains: arg,
                mode: 'insensitive',
            },
        },
    });
    return recipes;
}

export async function updateRecipe(arg) {
    const recipeobject = JSON.parse(arg);
    for (const ingredient of recipeobject.ingredients) {
        delete ingredient.id;
        delete ingredient.recipeId;
    }
    for (const step of recipeobject.steps) {
        delete step.id;
        delete step.recipeId;
    }
    await db.recipe.update({ 
        where: {
            id: recipeobject.id,
        },
        data: {
            name: recipeobject.name.toLowerCase(),
            user: recipeobject.user.toLowerCase(),
            notes: recipeobject.notes.toLowerCase(),
            ingredients: {
                deleteMany:{},
                create: 
                    recipeobject.ingredients,
            },
            steps: {
                deleteMany:{},
                create: 
                    recipeobject.steps,
            },
            userId: Number(recipeobject.userid),
        }})
}

export async function searchName(arg) {
    const recipes = await db.recipe.findMany({
        where: {
                name: {
                        contains: arg,
                        mode: 'insensitive',
                    },
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
            name: {
                    contains: arg,
                    mode: 'insensitive',
            },
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

export async function listAllUsers() {
    const users = await db.siteUser.findMany({});
    return users;
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