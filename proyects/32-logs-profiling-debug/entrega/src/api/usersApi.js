import { createUser } from "../models/user.js";
import { saveUser, uniqueName } from "../persistence/users.js";

export async function registerUser( dataUser ){
    await uniqueName( dataUser.username );
    const user = createUser( dataUser );
    await saveUser( user );
    return user
}