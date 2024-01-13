const db = new Map();

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

export function addRecipe(recipe) {
    db.set(
        generateID(db),
        recipe
    )
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
