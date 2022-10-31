const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index", {
        data: {
            mensaje: "Ejemplo con Pug",
            class: {
                titlePrincipal: "destacado",
            },
            },
    });
});

// datos?min=10&nivel=15&max=20&titulo=<i>Medidor</i>

app.get("/datos", (req, res) => {
    res.render("datos", req.query);
});

const PORT = 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));