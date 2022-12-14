import { getUserByName } from "../persistence/users.js"

export function authenticate ( username, password ) {
    let user
    try {
        user = getUserByName( username );
    } catch (error) {
        throw new Error('error de autenticacion')
    }
    if (user.password !== password) {
        throw new Error('error de autenticacion')
    }
    return user
};