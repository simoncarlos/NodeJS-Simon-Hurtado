import passport from "passport";
import { loggerConsole } from "../logConfig.js";

export const registerAuthController = passport.authenticate('register', { failureRedirect: '/failRegister' });

export const registerController = (req, res) => {
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.render("register");
}

export const registerSucessfullController = (req, res) => {
    req.session.username = req.body.username;
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.redirect("../aplication");
}