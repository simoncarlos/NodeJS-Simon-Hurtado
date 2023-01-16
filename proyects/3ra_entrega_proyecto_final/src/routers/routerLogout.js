import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";

const logout = new Router();

logout.get('/', logoutController);

export default logout;