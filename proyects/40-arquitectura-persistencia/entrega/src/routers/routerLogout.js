import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";

export const logout = new Router();

logout.get('/', logoutController);