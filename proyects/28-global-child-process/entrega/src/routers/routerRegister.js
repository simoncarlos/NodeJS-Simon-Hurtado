import { Router } from "express";
import { registerController, registerSucessfullController, registerAuthController } from "../controllers/registerController.js";

export const register = new Router();

register.get("/", registerController);
register.post("/", registerAuthController, registerSucessfullController);