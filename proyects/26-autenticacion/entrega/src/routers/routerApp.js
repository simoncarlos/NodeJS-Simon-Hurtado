import { Router } from "express";
import { appController } from "../controllers/appController.js";

export const aplication = new Router();

const nameUser = "pepe";

function auth(req, res, next) {
    if (req.session.username  === nameUser) {
        return next()
    }
    return res.redirect("../login");
}

aplication.get("/", auth, appController );