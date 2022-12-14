import { Router } from "express";

import { loginController } from "../controllers/loginController.js";
import { loginSucessfulControler } from "../controllers/loginController.js";
import { loginAuthController } from "../controllers/authController.js";

export const login = new Router();

const nameUser = "pepe";

function auth(req, res, next) {
    if (req.body.username  === nameUser) {
        return next()
    }
    return res.redirect("../login");
}

login.get('/', loginController);

login.post("/", loginAuthController, loginSucessfulControler);