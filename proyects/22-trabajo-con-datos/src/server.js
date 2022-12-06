import express from "express";
import aplication from "../router/routerApp.js";
import mock from "../router/routerMocks.js";
import http from "http"
import * as socketio from "socket.io"
import { Container } from "./container.js";
import { socketConfig } from "./socketConection.js";
import exphbs from "express-handlebars";
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

app.use(express.static('../public'))
app.engine("handlebars", exphbs.engine() );
app.use( "/productos", aplication );
app.use( "/api", mock);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/../public/views/aplication" );

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

socketConfig( io, productsContainer, chatContainer );

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port }`);
});