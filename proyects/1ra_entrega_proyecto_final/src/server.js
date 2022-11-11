const express = require("express");
const app = express();

const { products } = require("./routerProducts");
const { cart } = require("./routerCart");
const Container = require('./container');
let { logout, login } = require("./admin")

app.use( "/api/productos", products );
app.use( "/api/carrito", cart );

app.get("/login", (req, res) => {
    login();
    res.sendStatus(200);
});

app.get("/logout", (req, res) => {
    logout();
    res.sendStatus(200)
});

app.all("*", (req, res) => {
    res.status(404).json("Ruta no encontrada");
});

module.exports = {
    app
}