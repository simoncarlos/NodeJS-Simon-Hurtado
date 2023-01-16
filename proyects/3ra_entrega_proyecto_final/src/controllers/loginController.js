import passport from "passport";

export const loginAuthController = passport.authenticate('login', { failureRedirect: '/failLogin' });

export const loginSucessfullControler = (req, res) => {
    req.session.username = req.body.username;
    res.sendStatus(200);
};