import { appService } from "../services/appServices.js";
import { loggerConsole } from "../logConfig.js";

export const appController = async (req, res) =>{
    const data = await appService( req );
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.render("datos", data);
};