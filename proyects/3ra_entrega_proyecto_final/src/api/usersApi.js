import { createUser } from "../models/user.js";
import { userDao } from "../containers/daos/user/index.js";

const uniqueName = async ( userName ) => {
    const users = await userDao.getObjects();
    const findUser = users.filter( user => user.name === userName );
    if (findUser.length !== 0 ) throw new Error('el nombre de usuario no está disponible');
}

export async function registerUser( dataUser ){
    await uniqueName( dataUser.username );
    const user = createUser( dataUser );
    await userDao.saveObject( user );
    return user
}