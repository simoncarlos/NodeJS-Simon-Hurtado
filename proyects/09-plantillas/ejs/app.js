const express = require("express");
const app = express();

app.set("view engine", "ejs");

// datos?min=10&nivel=15&max=20&titulo=<i>Medidor</i>
app.get("/datos", (req, res) => {
    req.query["numeros"] = [1, 2, 3];
    res.render("datos", req.query);
});

const PORT = 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));