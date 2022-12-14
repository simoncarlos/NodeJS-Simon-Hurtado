import passport from "passport";

export const registerAuthController = passport.authenticate('registro', { failureRedirect: '/login' });

export const loginAuthController = passport.authenticate('login', { failureRedirect: '/login' });


