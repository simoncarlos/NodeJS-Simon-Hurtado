import { loggerConsole } from "../logConfig.js";

export const failLoginController = (req, res) => {
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.render("failLogin");
}