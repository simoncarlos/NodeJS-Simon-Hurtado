import { Router } from "express";
import { registerSucessfullController, registerAuthController } from "../controllers/registerController.js";

const register = new Router();

register.post("/", registerAuthController, registerSucessfullController);

export default register;