const fs = require('fs');
const express = require('express');
const app = express();

app.engine('cte', ( filePath, options, cb ) => {
    fs.readFile( filePath, (error, content) => {
        if(error){ 
            return cb(new Error(error)) 
        }
        const render = content.toString()
            .replace('^^titulo$$', "" + options.title + "")
            .replace('^^mensaje$$', "" + options.mensaje + "")
            .replace('^^autor$$', "" + options.autor + "")
            .replace('^^version$$', "" + options.version + "")
        return cb(null, render);
    });
});

app.set("views", "./views");
app.set("view engine", "cte");

app.get("/", (req, res) => {
    res.render("index", { title: "Prueba"})
});

app.get("/cte1", (req, res) => {
    res.render("plantilla", { title: "Prueba", version: "1.0", autor: "Felipe Pigna" })
});

const PORT = 8080;

app.listen( PORT, () => console.log(`http://localhost:${PORT}`) );