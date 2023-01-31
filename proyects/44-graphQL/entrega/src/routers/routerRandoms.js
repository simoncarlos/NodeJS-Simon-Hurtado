import { Router } from "express";
import { randomController } from "../controllers/randomController.js";

export const random = new Router();

random.get("/", randomController);