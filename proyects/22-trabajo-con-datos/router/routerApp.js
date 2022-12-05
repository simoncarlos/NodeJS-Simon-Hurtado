import express, { Router } from "express";
import { Container } from "../src/container.js";


const aplication = new Router();
aplication.use( express.json() );
aplication.use( express.urlencoded( { extended: true } ) );

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

aplication.get("/", async (req, res) =>{

    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    res.render("datos", { 
        products: listProducts,
        chat: listChat
    });

})

export default aplication;