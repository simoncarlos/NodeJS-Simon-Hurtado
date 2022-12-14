import { createUser } from "../models/user.js";
import { saveUser, uniqueName } from "../persistence/users.js";

export function registerUser( dataUser ){
    uniqueName( dataUser.username );
    const user = createUser( dataUser );
    saveUser( user );
    return user
}