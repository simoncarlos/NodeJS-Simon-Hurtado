const { servidor } = require("./server.js");

const server = servidor.listen( 8080, () => {
    console.log(`Conectado y escuchando en puerto ${server.address().port}`)
}); 