function newConectionMessage ( socket ) {
    socket.emit("mensaje", "Hola! Gracias por conectarte");
    socket.on("mensaje", data => { 
        console.log(data);
    });
};

module.exports = { newConectionMessage };