import http from "http"
import parseArgs from "minimist";
import * as socketio from "socket.io"

import { socketConfig } from "./socketConection.js";
import { app } from "./server.js";

const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

socketConfig( io );
const args = parseArgs( process.argv.slice(2) );

process.env.PORT = args.p || 6060 ;

const server = httpServer.listen(process.env.PORT, () => {
    console.log(`servidor conectado en puerto ${server.address().port }`);
});