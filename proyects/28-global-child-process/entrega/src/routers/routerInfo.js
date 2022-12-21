import { Router } from "express";
import { infoController } from "../controllers/infoController.js";

export const information = new Router();

information.get("/", infoController);