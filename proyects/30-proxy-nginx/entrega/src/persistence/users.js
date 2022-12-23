import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const stringConnection = `mongodb+srv://${username}:${password}@cluster0.lx2r1rq.mongodb.net/?retryWrites=true&w=majority`;
const database = process.env.DATABASE;
const client = new MongoClient( stringConnection, { authSource: "admin", auth: { username, password, } });

await client.connect();

const dbCoderhouse = client.db( database );

const dbUsers = dbCoderhouse.collection("users");

export async function saveUser( user ){
    await dbUsers.insertOne( user )
}

export async function getUserByName( username ) {
    const user = await dbUsers.findOne( { username: username } );
    if (!user) throw new Error('no existe un usuario con ese nombre')
    return user
}

export async function uniqueName( username ){
    const user = await dbUsers.findOne( { username: username } );
    if (user) throw new Error('el nombre de usuario no está disponible');
}

export async function getUserById( id ) {
    const user = await dbUsers.findOne( { id: id } );
    if (!user) throw new Error('no existe un usuario con ese id')
    return user
}