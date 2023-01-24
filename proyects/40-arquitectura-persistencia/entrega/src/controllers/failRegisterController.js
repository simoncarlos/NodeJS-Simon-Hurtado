import { loggerConsole } from "../logConfig.js";

export const failRegisterController = (req, res) => {
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.render("failRegister");
}