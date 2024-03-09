import * as db from '$lib/server/database.js';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import {dev} from '$app/environment';

export const actions = {
    delete: async ({cookies}) => {
        if (dev) {
            await db.deleteUsers();
            cookies.delete("Authorization", {path: '/'});
        }
    },
    
    login: async ({request, cookies}) => {
        const data = await request.formData();
        const user = data.get("name");
        const pass = data.get("pass");
        const result = await db.getUser(user);
        if(result === null || result.length === 0) {
            return fail(400, {message: "could not find user"});
        }
        if (await bcrypt.compare(pass, result.password)) {
            cookies.set("Authorization", user+":"+pass, {path: '/'} );
            throw redirect(303, '/user/'+user);
        }
        else {
            return fail(400, {message: "incorrect password"});
        }
    },

    logout: async ({cookies,locals}) => {
        cookies.delete("Authorization", {path: '/'});
        locals.user = null;
    },
    
    register: async({request, cookies}) => {
        const data = await request.formData();
        const user =  data.get("name");
        const pass = data.get("pass");
        const result = await db.getUser(user);
        if (result !== null && result.length !== 0)
        {
            console.log("hmmm")
            return fail(403, {message: "user already exists :("})
        }
        console.log("hehe")
        const hashed = await bcrypt.hash(pass, 10);
        const compileduser = {
            name: user,
            password: hashed
        }
        console.log(compileduser)
        await db.createUser(compileduser);
        cookies.set("Authorization", user+":"+pass, {path: '/'} );
        throw redirect(303, '/user/'+user);
    },


}
