const express = require("exoress");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const HttpServer = 1;

app.use(express.static("public"));

app.get("/", () => {
    res.send("OK");
});

const server = httpServer.listen( 8080, () => console.log(`Escuchando en el puerto ${8080}`) );