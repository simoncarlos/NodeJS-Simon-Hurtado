import knex from "knex";

const DRIVER = "mysql";
const USER = "root";
const PASSWORD = "";
const HOST = "localhost";
const PORT = "3306";
const DB_NAME = "coderhouse"


const knexClient = knex({
    client: "mysql2",
    connection: `${DRIVER}://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`
});

const existeTablaPersonas = await knexClient.schema.hasTable("alumnos")
if( !existeTablaPersonas ){
    await knexClient.schema.createTable("alumnos", table => {
        table.increments("id"),
            table.string("nombre"),
            table.integer("edad")
    })
}

await knexClient.insert( { nombre: "Diego", edad: 24} ).into("alumnos");

await knexClient.destroy();

//const DRIVER = 'mysql'
//const USERNAME = 'root'
//const PASSWORD = 'mysqlpassword'
//const HOST = 'localhost'
//const PORT = '3306'
//const DB_NAME = 'coderhouse'
//
//const cnxStr = `${DRIVER}://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`
//
//export const MYSQL_KNEX_CONFIG = {
//    client: 'mysql2',
//    connection: cnxStr
//}