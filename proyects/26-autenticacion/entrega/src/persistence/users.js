const users = [{username: "pepe", password: "pepita"}];

export function saveUser( user ){
    users.push( user );
}

export function getUserByName( username ) {
    const user = users.find(u => u.username === username)
    if (!user) throw new Error('no existe un usuario con ese nombre')
    return user
}

export function uniqueName( username ){
    const user = users.find(u => u.username === username);
    if (user) throw new Error('el nombre de usuario no está disponible');
}

export function getUserById( id ) {
    const user = users.find(u => u.id === id)
    if (!user) throw new Error('no existe un usuario con ese id')
    return user
}