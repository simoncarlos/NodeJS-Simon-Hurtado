export default function createServer( PORT, app ) {
    const server = app.listen( PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
    });
    server.on("error", error => console.log(`Error al establecer la conexion con el servidor ${error}`));
}