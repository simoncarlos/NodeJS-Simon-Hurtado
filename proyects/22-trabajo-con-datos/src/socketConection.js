import { normalize, denormalize, schema } from "normalizr";

export function socketConfig ( io, productsContainer, chatContainer){

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
            const data = await chatContainer.readFile();
            const dataNormalized = normalized( data )
            io.sockets.emit("newMessage", dataNormalized);
        });

    });

}

function normalized( data ){
    const authorSchema = new schema.Entity("authors");
    const chatSchema = new schema.Entity("message", {
        author: authorSchema
    });
    const normalizedData = { data: normalize( data, chatSchema ), schema: chatSchema };
    return normalizedData
}