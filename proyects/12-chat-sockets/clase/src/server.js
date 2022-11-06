const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { newConectionMessage } = require("./newConection.js");
const { router } = require("./router.js");

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

app.use( express.static('../public') );

app.use("/", router);

newConectionMessage(io);

module.exports = {
    servidor : httpServer
}