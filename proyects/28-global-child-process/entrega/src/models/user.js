import { createId } from "./Ids.js";

export function createUser({ id = createId(), username, password}) {
    if (!username) throw new Error(`MISSING_ARGS: el campo 'username' es obligatorio`)
    if (!password) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)

    return {
        id,
        username,
        password,
    }
}