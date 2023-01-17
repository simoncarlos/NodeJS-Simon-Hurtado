import { Router } from "express";
import { usersSucessfullController, usersAuthController } from "../controllers/usersController.js";

const users = new Router();

users.post("/", usersAuthController, usersSucessfullController);

export default users;