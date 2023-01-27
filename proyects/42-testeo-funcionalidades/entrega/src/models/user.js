import { createId } from "./Ids.js";
import { loggerError } from "../logConfig.js";

export function createUser({ id = createId(), username, password}) {
    if (!username){
        loggerError.error("Campo username obligatorio");
        throw new Error(`MISSING_ARGS: el campo 'username' es obligatorio`)
    }
    if (!password){
        loggerError.error("Campo password password obligatorio");
        throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)
    }

    return {
        id,
        username,
        password,
    }
}