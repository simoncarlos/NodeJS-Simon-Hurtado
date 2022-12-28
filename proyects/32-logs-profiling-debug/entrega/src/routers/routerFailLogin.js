import { Router } from "express";
import { failLoginController } from "../controllers/failLoginController.js";

export const failLogin = new Router();

failLogin.get("/", failLoginController);