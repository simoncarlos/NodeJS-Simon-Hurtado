import parseArgs from "minimist";
import path from 'path';
import { loggerConsole } from "../logConfig.js";

export const infoController = (req, res) => {
    const dataProcess = {
        arg: parseArgs( process.argv ),
        so: process.platform,
        node: process.version,
        memory: process.memoryUsage(),
        path: process.cwd(),
        processId: process.pid,
        folder: path.resolve(process.cwd(), "../"),
        quantity: process._eventsCount,
    }
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    //console.log(`argumentos: ${dataProcess.arg} \n S.O: ${dataProcess.so} \n Node: ${dataProcess.node} \n memory: ${dataProcess.memory} \n path: ${dataProcess.path} \n Id Proceso: ${dataProcess.processId} \n Carpeta: ${dataProcess.folder} \n Cantidad: ${dataProcess.quantity}`);
    res.render("info", dataProcess);
};