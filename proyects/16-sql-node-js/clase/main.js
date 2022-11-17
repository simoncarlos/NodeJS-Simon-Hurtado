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

// Write

await knexClient.insert( { nombre: "Steffi", edad: 18} ).into("alumnos");

await knexClient.insert( [
    { nombre: "Ramiro", edad: 21},
    { nombre: "Damian", edad: 20}
] ).into("alumnos");

// Read

const alumnos = await knexClient.select().from("alumnos")//.whereBetween( "edad", [31, 37] )
console.log(alumnos)

// Update

await knexClient.from( "alumnos" ).where( { nombre: "Damian" } ).update( { edad: 45 } ); //.whereBetween( "edad", [31, 37] )

// Delete

await knexClient.delete().from("alumnos").where( { nombre: "Damian" } )

await knexClient.destroy();