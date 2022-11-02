const express = require("express");
const app = express();
const { Router } = express;
const products = new Router();


app.use( "/productos", products);
app.use( "/productos", express.static( __dirname + "/public") );
app.use( ( req, res, next ) => {
        res.sendStatus(400).send("Page not found");
});
app.set("view engine", "ejs");

products.use( express.json() );
products.use( express.urlencoded( { extended: true } ) );

const listProducts = [];

products.get("/", (req, res) => {
    req.query["listProducts"] = listProducts;
    res.render("data", req.query);
});

products.post("/form", (req, res) => {
    listProducts.push( req.body );
    console.log("La nueva lista de productos es:");
    console.log(listProducts);
    res.redirect("../");
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=> {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("error", error => console.log(`Error al establecer la conexcion con el servidor ${error}`));