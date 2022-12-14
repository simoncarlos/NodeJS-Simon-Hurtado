import express from "express";

import { aplication } from "./routers/routerApp.js";
import { logout } from "./routers/routerLogout.js";
import { login } from "./routers/routerLogin.js";

import {engine} from "express-handlebars";
import path from 'path';
import {fileURLToPath} from 'url';
import { sessionHandler as session } from "./middlewares/session.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( session );

// configuracion plantillas

app.use(express.static(__dirname + '/../public/'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/../public/');

// rutas

app.use( "/login", login);
app.use("/aplication", aplication);
app.use("/logout", logout);
// crea nueva ruta de registro y errorLogin

