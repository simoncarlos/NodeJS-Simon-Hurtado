import express, {Router} from "express";
import aplication from "../router/routerApp.js";
import logout from "../router/routerLogout.js";
import login from "../router/routerLogin.js";
import http from "http"
import * as socketio from "socket.io"
import { Container } from "./container.js";
import { socketConfig } from "./socketConection.js";
import {engine} from "express-handlebars";
import session from 'express-session';
import path from 'path';
import {fileURLToPath} from 'url';
import MongoStore from 'connect-mongo'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

const stringMongoConnection = 'mongodb+srv://diego:contri@cluster0.lx2r1rq.mongodb.net/?retryWrites=true&w=majority';

app.use(express.static(__dirname + '/../public/'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: stringMongoConnection,
    }),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/../public/');

app.use( "/login", login);
app.use("/aplication", aplication);
app.use("/logout", logout)

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

socketConfig( io, productsContainer, chatContainer );

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port }`);
});