import { getUserByName } from "../persistence/users.js"

export async function authenticate ( username, password ) {
    let user
    try {
        user = await getUserByName( username );
    } catch (error) {
        throw new Error('error de autenticacion')
    }
    if (user.password !== password) {
        throw new Error('error de autenticacion')
    }
    return user
};