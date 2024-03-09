/** @type {import('@sveltejs/kit').Handle} */
import { getUser } from '$lib/server/database.js';

export async function handle({ event, resolve }) {
    if (event.cookies.get("Authorization", {path:'/'}) !== undefined && event.cookies.get("Authorization", {path:'/'}) !== null) {
	    event.locals.user = await getUser(event.cookies.get('Authorization', {path: '/'}).split(":")[0]);
	    return resolve(event);
    }
    else {
        // event.cookies.set("Authorization", ' : ', {path:'/'});
        return resolve(event);
    }
}