import express from "express";

import { sessionHandler as session } from "./middlewares/session.js";
import { passportMiddleware, passportSessionHandler } from "./middlewares/passport.js";

import cart from "../routers/routerCart.js";
import products from "../routers/routerProduct.js";
import login from "./routers/routerLogin.js";
import failLogin from "./routers/routerFailLogin.js";
import register from "./routers/routerRegister.js";
import failRegister from "./routers/routerFailRegister.js";
import logout  from "./routers/routerLogOut.js";

// Middlewares

const app = express();
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( session );
app.use( passportMiddleware );
app.use( passportSessionHandler );

// Routers

app.use( "/api/products", products );
app.use( "/api/shoppingcart", cart );
app.use( "/login", login );
app.use( "/failLogin", failLogin );
app.use( "/register", register );
app.use( "/failRegister", failRegister );
app.use( "/logout", logout );

//res.send( { error: -1, descripcion: `ruta ${req.url}, metodo ${req.method} no autorizado` } );

app.all( "*", (req, res) => {
    res.send( { error: -2, descripcion: `ruta ${req.url}, metodo ${req.method} no implementada` } )
});

export default app;