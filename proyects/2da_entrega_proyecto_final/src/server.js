import express from "express";
import { login, logout } from "./admins.js";
import cart from "../routers/routerCart.js";
import products from "../routers/routerProduct.js";

const app = express();
app.use( "/api/products", products );
app.use( "/api/shoppingcart", cart );

app.get( "/login", (req, res) => {
    login();
    res.sendStatus(200);
});

app.get("/logout", (req, res) => {
    logout();
    res.sendStatus(200)
});

app.all("*", (req, res) => {
    res.send( { error: -2, descripcion: `ruta ${req.url}, metodo ${req.method} no implementada` } )
});

export default app;