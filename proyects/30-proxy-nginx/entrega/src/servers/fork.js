import { createHttpServer } from "../createServer.js";

export function forkServer( httpServer ){
    
    createHttpServer( httpServer );

};