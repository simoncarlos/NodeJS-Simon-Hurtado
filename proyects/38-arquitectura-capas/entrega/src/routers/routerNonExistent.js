import { Router } from "express";
import { nonExistentController } from "../controllers/nonExistentController.js";

export const nonExistent = new Router();

nonExistent.get("/", nonExistentController);