import { getUserByName } from "../persistence/users.js"
import { userDao } from "../containers/daos/user/index.js";

const getUserByName = async ( name ) => {
    const users = await userDao.getObjects();
    const userByName = users.filter( user => user.name === name );
    if ( userByName.length !== 0 ) throw new Error('no existe un usuario con ese nombre')
    return userByName[0]
}

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