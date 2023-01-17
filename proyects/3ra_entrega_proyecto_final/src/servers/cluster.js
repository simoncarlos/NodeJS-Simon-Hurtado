import cluster from "cluster";
import os from 'os'
import createServer from "../createServer.js"

const numCPUs = os.cpus().length

export function clusterServer( PORT, app ){
    if(cluster.isPrimary){
        console.log(`PID PRIMARIO ${process.pid}`);
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
            cluster.fork()
        });
    }else{
        createServer( PORT, app );
    }
};