const knex = require("knex");

const dbConfig = {
    DRIVER: "mysql",
    USER: "root",
    PASSWORD: "",
    HOST: "localhost",
    PORT: "3306",
    DB_NAME: "coderhouse"
}

const cnxStr = `${dbConfig.DRIVER}://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB_NAME}`

const clienteMySQL = knex({
    client: "mysql2",
    connection: cnxStr
})

const clienteSQLite3 = knex({
    client: "sqlite3",
    connection: { filename: "../DB/sqlite3.db" },
    useNullAsDefault: true
})

module.exports = { clienteMySQL, clienteSQLite3 }