export function createHttpServer( httpServer ){
    const server = httpServer.listen(process.env.PORT, () => {
        console.log(`servidor conectado en puerto ${server.address().port } en el proceso con id: ${process.pid}`);
    });
}