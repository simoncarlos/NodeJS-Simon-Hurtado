const express = require("express");
const exphbs = require("express-handlebars");

const http = require("http");
const socketio = require("socket.io");

const app = express();
const httpServer = new http.Server(app);
const io = new socketio.Server(httpServer);

app.use(express.static('../public'))

const Container = require('./container');
const { socketConfig } = require("./socketConection"); 

app.engine("handlebars", exphbs.engine() );
app.set("view engine", "handlebars");
app.set("views", "../public/views");

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

app.get("/productos", async (req, res) =>{

    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    res.render("datos", { 
        products: listProducts,
        chat: listChat
    });

})

socketConfig( io, productsContainer, chatContainer );

//const PORT = process.env.PORT || 8080;
//
//app.listen(PORT, () => console.log(`http://localhost:${PORT}`) );

const server = httpServer.listen(8080, () => {
    console.log(`servidor conectado en puerto ${server.address().port }`);
});