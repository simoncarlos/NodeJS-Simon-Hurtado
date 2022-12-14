import http from "http"
import * as socketio from "socket.io"

import { socketConfig } from "./socketConection.js";
import { app } from "./server.js";

const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

socketConfig( io );

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port }`);
});