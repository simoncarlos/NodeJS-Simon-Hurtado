import express, { Router } from "express";
import { Container } from "../src/container.js";

const mock = new Router();
mock.use( express.json() );
mock.use( express.urlencoded( { extended: true } ) );

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

mock.get("/productos-test", async (req, res) =>{

    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    res.render("../mocks/faker", { 
        products: listProducts,
        chat: listChat
    });

})

export default mock;