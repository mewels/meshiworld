import * as db from '$lib/server/database.js';

export const actions = {
    delete: async () => {
        db.deleteAll();
    },
}