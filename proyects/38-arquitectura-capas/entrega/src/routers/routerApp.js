import { Router } from "express";
import { appController } from "../controllers/appController.js";
import { requireAuth } from "../middlewares/authorization.js";

export const aplication = new Router();

aplication.get("/", requireAuth, appController );