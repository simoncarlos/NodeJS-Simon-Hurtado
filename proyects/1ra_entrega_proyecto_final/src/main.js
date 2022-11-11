const { app } = require("./server");

const PORT = process.env.PORT || 8080;

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puertp ${server.address().port}`);
});

server.on("error", error => console.log(`Error al establecer la conexion con el servidor ${error}`));