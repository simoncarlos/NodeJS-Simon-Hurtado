import { Router } from "express";

import { loginController, loginSucessfulControler, loginAuthController } from "../controllers/loginController.js";

export const login = new Router();

login.get('/', loginController);

login.post("/", loginAuthController, loginSucessfulControler);