import { Router } from "express";
import { failLoginController } from "../controllers/failLoginController.js";

const failLogin = new Router();

failLogin.get("/", failLoginController);

export default failLogin;