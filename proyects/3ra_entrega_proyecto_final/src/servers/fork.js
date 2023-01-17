import createServer from "../createServer.js"

export default function forkServer( PORT, app ){
    createServer( PORT, app );
};