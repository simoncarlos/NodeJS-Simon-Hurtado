import passport from "passport";

import { getUserById } from "../persistence/users.js";
import * as strategies from "./passportStrategies.js";

passport.use("registro", strategies.localRegister);
passport.use("login", strategies.localLogin);

export const passportMiddleware = passport.initialize();

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    try {
        const user = getUserById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export const passportSessionHandler = passport.session();