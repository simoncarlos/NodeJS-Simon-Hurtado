import { Strategy } from "passport-local";
import { registerUser } from "../api/usersApi.js";
import { authenticate } from "../api/authApi.js";

export const localRegister = new Strategy(
    {
        passReqToCallback: true,
        //usernameField: 'username',
        //passwordField: 'password',
    },
    (req, username, password, done) => {
        try {
            const user = registerUser(req.body);
            done(null, user);
        } catch (error) {
            done(null, false, error);
        }
    }
);

export const localLogin = new Strategy(
    ( username, password , done ) => {
        try {
            const user = authenticate(username, password);
            done(null, user);
        } catch (error) {
            done(null, false, error);
        }
    }
);