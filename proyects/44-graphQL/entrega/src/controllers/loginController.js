import passport from "passport";
import { loggerConsole } from "../logConfig.js";

export const loginAuthController = passport.authenticate('login', { failureRedirect: '/failLogin' });

export const loginController = (req, res) => { 
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.render( "login" ); 
};

export const loginSucessfulControler = (req, res) => {
    req.session.username = req.body.username;
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.redirect("../aplication");
};