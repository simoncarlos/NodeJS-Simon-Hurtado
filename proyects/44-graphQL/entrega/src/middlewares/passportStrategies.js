import { Strategy } from "passport-local";
import { registerUser } from "../api/usersApi.js";
import { authenticate } from "../api/authApi.js";

export const localRegister = new Strategy(
    {
        passReqToCallback: true,
    },
    async (req, username, password, done) => {
        try {
            const user = await registerUser(req.body);
            done(null, user);
        } catch (error) {
            done(null, false, error);
        }
    }
);

export const localLogin = new Strategy(
    async ( username, password , done ) => {
        try {
            const user = await authenticate(username, password);
            done(null, user);
        } catch (error) {
            done(null, false, error);
        }
    }
);