import passport from "passport";
import { loggerConsole } from "../config";

export const loginAuthController = passport.authenticate('login', { failureRedirect: '/failLogin' });

export const loginSucessfullControler = (req, res) => {
    req.session.username = req.body.username;
    loggerConsole.info("Login Sucessfull");
    res.sendStatus(200);
};