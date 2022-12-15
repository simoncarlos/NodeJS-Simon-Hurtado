//const users = [{ id: 2761862716782, username: "pepe", password: "pepita"}];

import { MongoClient } from "mongodb";

const username = 'diego'
const password = 'contri'
const stringConnection = `mongodb+srv://${username}:${password}@cluster0.lx2r1rq.mongodb.net/?retryWrites=true&w=majority`;
const database = "databaseCoder"
const client = new MongoClient( stringConnection, { authSource: "admin", auth: { username, password, } });

await client.connect();

const dbCoderhouse = client.db( database );

const dbUsers = dbCoderhouse.collection("users");

export async function saveUser( user ){
    await dbUsers.insertOne( user )
    //users.push( user );
}

export async function getUserByName( username ) {
    const user = await dbUsers.findOne( { name: username } );
    //const user = users.find(u => u.username === username)
    if (!user) throw new Error('no existe un usuario con ese nombre')
    return user
}

export async function uniqueName( username ){
    const user = await dbUsers.findOne( { name: username } );
    //const user = users.find(u => u.username === username);
    if (user) throw new Error('el nombre de usuario no está disponible');
}

export async function getUserById( id ) {
    const user = await dbUsers.findOne( { id: id } );
    //const user = users.find(u => u.id === id)
    if (!user) throw new Error('no existe un usuario con ese id')
    return user
}