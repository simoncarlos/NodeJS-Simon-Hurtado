import { Router } from "express";
import { failRegisterController } from "../controllers/failRegisterController.js"

const failRegister = new Router();

failRegister.get("/", failRegisterController);

export default failRegister;