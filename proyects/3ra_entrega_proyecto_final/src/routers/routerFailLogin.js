import { Router } from "express";
import { failLoginController } from "../controllers/failLoginController";

const failLogin = new Router();

failLogin.get("/", failLoginController);

export default failLogin;