import { Router } from "express";
import { loginAuthController, loginSucessfullControler } from "../controllers/loginController.js";

const login = new Router();

login.post("/", loginAuthController, loginSucessfullControler);

export default login;