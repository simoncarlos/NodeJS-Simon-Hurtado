import { fork } from 'child_process';
import path from 'path';
import { loggerConsole } from '../logConfig.js';

export const randomController = (req, res) => {

    const randomNumbers = fork(path.resolve(process.cwd() + "/child-process", 'getRandomNumbers.js'))

    if ( req.query.cant ){
        randomNumbers.send( req.query.cant );
    }else{
        randomNumbers.send(100000000);
    }
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    randomNumbers.on("message", data => {
        res.render("random", { numbers: data });
    });
}