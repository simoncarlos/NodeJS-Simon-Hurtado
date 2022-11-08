const container = require("./container");

function socketConfig ( io, productsContainer, chatContainer){

    io.on("connection", socket => {
        
        socket.emit("mensaje", "Hola, gracias por conectarte");

        socket.on( "newProduct", async product => {
            console.log(product);
            await productsContainer.saveObject(product);
            io.sockets.emit("newProduct", product);
        });

        socket.on( "newMessage", async message => {
            console.log(message);
            await chatContainer.saveObject(message);
            io.sockets.emit("newMessage", message);
        });

    });

}

module.exports = { socketConfig }