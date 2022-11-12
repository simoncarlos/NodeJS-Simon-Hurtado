const express = require("express");
const app = express();

const { products } = require("./routerProducts");
const { cart } = require("./routerCart");
let { logout, login } = require("./admin") 

app.use( "/api/products", products );
app.use( "/api/shoppingcart", cart );

app.get("/login", (req, res) => {
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

module.exports = {
    app
}