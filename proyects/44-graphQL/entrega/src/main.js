import http from "http"
import parseArgs from "minimist";
import * as socketio from "socket.io"

import { socketConfig } from "./socketConection.js";
import { app } from "./server.js";
import { clusterServer } from "./servers/cluster.js";
import { forkServer } from "./servers/fork.js";

const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

socketConfig( io );
const args = parseArgs( process.argv.slice(2) );
process.env.PORT = args.p || 8080 ;

if( args._[0] === "CLUSTER" ){
    clusterServer( httpServer );
}else{
    forkServer( httpServer );
};