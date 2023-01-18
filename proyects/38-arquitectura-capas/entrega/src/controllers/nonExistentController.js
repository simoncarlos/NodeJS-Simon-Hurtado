import { loggerWarn } from "../logConfig.js";

export const nonExistentController = (req, res) => {
    loggerWarn.warn(`Ruta: ${req.url}, metodo: ${req.method}, INEXISTENTES`);
    res.status(404).send("Page not found");
}