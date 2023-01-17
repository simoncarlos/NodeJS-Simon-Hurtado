import app from "./server.js";
import { TYPE_SERVER } from "./config.js";
import { clusterServer } from "./servers/cluster.js";
import forkServer from "./servers/fork.js";

const PORT = process.env.PORT || 8080;

if( TYPE_SERVER === "Cluster" ) clusterServer( PORT, app );
else forkServer( PORT, app );