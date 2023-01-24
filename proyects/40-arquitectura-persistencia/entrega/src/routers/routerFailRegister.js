import { Router } from "express";
import { failRegisterController } from "../controllers/failRegisterController.js"

export const failRegister = new Router();

failRegister.get("/", failRegisterController);