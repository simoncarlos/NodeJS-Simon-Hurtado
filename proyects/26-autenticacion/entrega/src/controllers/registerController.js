import passport from "passport";

export const registerAuthController = passport.authenticate('register', { failureRedirect: '/failRegister' });

export const registerController = (req, res) => {
    res.render("register");
}

export const registerSucessfullController = (req, res) => {
    req.session.username = req.body.username;
    res.redirect("../aplication");
}