import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();});
};

// PRISMA FUNCTIONS
export async function addRecipe(recipe) {
    const recipeobject = JSON.parse(recipe);

    let sectionlist = [];

    var temp = await db.recipe.create({ 
        data: {
            name: recipeobject.name.toLowerCase(),
            user: recipeobject.user.toLowerCase(),
            notes: recipeobject.notes.toLowerCase(),
            userId: recipeobject.userid,
        },
        include: {
            sections: true,
        },
    })

    for (const section of recipeobject.sections)
    {        
        var sobject = await db.section.create({
            data: {
                number: section.number,
                title: section.title.toLowerCase(),
                ingredients: {create: section.ingredients},
                steps: {create: section.steps},
                recipeId: temp.id,
            },
            include: {
                ingredients: true,
                steps: true,
            },
        })
        sectionlist.push({id: sobject.id});
    }

    temp = await db.recipe.update({
        where: {id: temp.id},
        data: {
            sections: {
                connect: sectionlist,
            },
        },
        include: {
            sections: {
               include: {
                    ingredients: true,
                    steps: true,
               },
            },
        },
    })
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
    await db.section.deleteMany({})
    await db.recipe.deleteMany({});
    // await db.siteUser.deleteMany({});
}

export async function deleteUsers() {
    await db.siteUser.deleteMany({});
}

export async function deleteRecipe(id) {
    const recipeobject = await getRecipe(id);
    for (const section in recipeobject.sections)
    {
        await db.ingredient.deleteMany({
            where: {
                sectionId: section.id,
            },
        })
        await db.step.deleteMany({
            where: {
                sectionId: section.id,
            },
        })
    }

    await db.section.deleteMany({
        where: {
            recipeId: parseInt(id),
        },
    })


    await db.recipe.delete({
        where: {
            id: parseInt(id),
        },
    })
}

export async function getUser(arg) {
    const user = await db.siteUser.findFirst({
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
    // console.log(recipeobject);

    // for (const section of recipeobject.sections)
    // {
    //     for (const ingredient of section.ingredients) {
    //         delete ingredient.id;
    //         delete ingredient.sectionId;
    //     }
    //     for (const step of section.steps) {
    //         delete step.id;
    //         delete step.sectionId;
    //     }
    // }

    let sectionlist = [];

    await db.recipe.update({ 
        where: {
            id: recipeobject.id,
        },
        data: {
            name: recipeobject.name.toLowerCase(),
            user: recipeobject.user.toLowerCase(),
            notes: recipeobject.notes.toLowerCase(),
            userId: Number(recipeobject.userid),
        },
        include: {
            sections: true,
        },
    })

    for (const section of recipeobject.sections)
    {   
        await db.ingredient.deleteMany({
            where: {
                sectionId: section.id,
            },
        })

        await db.step.deleteMany({
            where: {
                sectionId: section.id,
            },
        })

        for (const i of section.ingredients)
        {
            delete i.id;
            delete i.sectionId;
        }

        for (const s of section.steps)
        {
            delete s.id;
            delete s.sectionId;
        }

        console.log(section.ingredients)
        console.log(section.steps)

        var sobject = await db.section.update({
            where: {
                id: section.id,
            },
            data: {
                number: section.number,
                title: section.title.toLowerCase(),
                ingredients: {create: section.ingredients},
                steps: {create: section.steps},
                // recipeId: recipeobject.id,
            },
            include: {
                ingredients: true,
                steps: true,
            },
        })

        sectionlist.push({id: sobject.id});
    }

    await db.recipe.update({
        where: {id: recipeobject.id},
        data: {
            sections: {
                connect: sectionlist,
            },
        },
        include: {
            sections: {
               include: {
                    ingredients: true,
                    steps: true,
               },
            },
        },
    })
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
        const sections = await db.section.findMany({
            where: {
                id: i.sectionId,
            },
        })

        for (const s of sections)
        {
            const r = await getRecipe(s.recipeId);
            recipes.push(r);
        }
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
            sections: {
               include: {
                    ingredients: true,
                    steps: true,
               },
            },
        },
    })
    return recipe;
}