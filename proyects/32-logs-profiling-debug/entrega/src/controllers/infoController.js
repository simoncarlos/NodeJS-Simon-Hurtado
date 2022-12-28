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
    res.render("info", dataProcess);
};