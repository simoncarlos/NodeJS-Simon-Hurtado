import { loggerWarn } from "../config";

export const failLoginController = (req, res) => {
    loggerWarn.warn("Falló el login");
    res.sendStatus(404);
}