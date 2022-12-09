import express, { Router } from "express";
import { Container } from "../src/container.js";

const aplication = new Router();
aplication.use( express.json() );
aplication.use( express.urlencoded( { extended: true } ) );

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

const nameUser = "pepe";

function auth(req, res, next) {
    if (req.session.username  === nameUser) {
        return next()
    }
    return res.redirect("../login");
}

aplication.get("/", auth, async (req, res) =>{

    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    const name = req.session.username;
    //req.session.touch();
    res.render("datos", { 
        products: listProducts,
        chat: listChat,
        name: name
    });

})

export default aplication;