import express from "express";
import exphbs from "express-handlebars";

import http from "http"
import * as socketio from "socket.io"

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

app.use(express.static('../public'))

import { Container } from "./container.js";
import { socketConfig } from "./socketConection.js";

app.engine("handlebars", exphbs.engine() );
app.set("view engine", "handlebars");
app.set("views", "../public/views");

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

app.get("/productos", async (req, res) =>{

    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    res.render("datos", { 
        products: listProducts,
        chat: listChat
    });

})

socketConfig( io, productsContainer, chatContainer );

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port }`);
});