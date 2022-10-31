const express = require("express");
const exphbs = require("express-handlebars")

const app = express();

app.engine("handlebars", exphbs.engine() );
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) =>{
    res.render("datos", { title: "nuevo titulo", mensaje: "nuevo mensaje"} );//archivo, datos(objeto)
})

const PORT = 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`) );