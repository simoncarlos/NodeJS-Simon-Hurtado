import passport from "passport";

import { authServices } from "../services/authServices.js";

export const usersAuthController = passport.authenticate('register', { failureRedirect: '/failRegister' });

export const usersSucessfullController = async (req, res) => {
    req.session.username = req.body.name;
    await authServices( req );
    res.sendStatus(200);
}