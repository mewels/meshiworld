/** @type {import('./$types').PageServerLoad} */

export function load({locals}) {
    // console.log(locals.user)
    return {
        sessionuser : locals.user
    };
}