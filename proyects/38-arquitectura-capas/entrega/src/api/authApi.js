import { getUserByName } from "../persistence/users.js"
import { loggerError } from "../logConfig.js";

export async function authenticate ( username, password ) {
    let user
    try {
        user = await getUserByName( username );
    } catch (error) {
        loggerError.error("Error de autenticación: " + error);
        throw new Error('error de autenticacion')
    }
    if (user.password !== password) {
        loggerError.error("Error de autenticación: " + error);
        throw new Error('error de autenticacion')
    }
    return user
};