import passport from "passport";

export const registerAuthController = passport.authenticate('register', { failureRedirect: '/failRegister' });

export const registerSucessfullController = (req, res) => {
    req.session.username = req.body.username;
    res.sendStatus(200);
}