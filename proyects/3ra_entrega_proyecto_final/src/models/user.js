import { createId } from "./Ids.js";

export function createUser({ id = createId(), username, password, email, lastname, image}) {

    if (!username) throw new Error(`MISSING_ARGS: el campo 'username' es obligatorio`)
    if (!password) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)
    if (!email) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)
    if (!lastname) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)
    if (!image) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)

    return {
        id,
        username,
        password,
        email,
        lastname,
        image
    }
}