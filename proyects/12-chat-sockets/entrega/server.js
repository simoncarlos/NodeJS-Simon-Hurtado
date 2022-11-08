const express = require("express");
const exphbs = require("express-handlebars")

const app = express();

app.engine("handlebars", exphbs.engine() );
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

let listProducts = [ 
    { nombre: "diego", precio: "10pe", thumbnail: "foto.jpg" } 
];

app.get("/productos", (req, res) =>{
    res.render("datos", { 
        products: listProducts,
        title: "nuevo titulo", 
        mensaje: "nuevo mensaje", 
        autor: "Diego", 
        version: "3.0"
    });
})

app.post("/productos", (req, res) => {
    listProducts.push( req.body );
    console.log(listProducts);
    res.redirect("./");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`) );