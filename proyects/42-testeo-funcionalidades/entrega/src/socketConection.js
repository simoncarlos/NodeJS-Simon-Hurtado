import { normalize, denormalize, schema } from "normalizr";
import util from "util";
import { Container } from "./persistence/container.js";
import { aplication } from "./services/index.js";

export function socketConfig ( io ){

    const productsContainer = new Container("products.txt");
    const chatContainer = new Container("chat.txt");

    io.on("connection", socket => {
        
        socket.emit("mensaje", "Hola, gracias por conectarte");

        socket.on( "newProduct", async product => {
            await productsContainer.saveObject(product);
            io.sockets.emit("newProduct", product);
        });

        socket.on( "newMessage", async message => {
            await chatContainer.saveObject(message);//await aplication.guardarMensaje( message );
            const data = await chatContainer.readFile();//const data = await aplication.verMensajes();//chatContainer.readFile();
            //const dataNormalized = normalized( data)
            //console.log(dataNormalized);
            io.sockets.emit("newMessage", data);
        });

    });

}

function normalized( data ){
    const authorSchema = new schema.Entity('authors', {}, {
        idAttribute: 'email'
    });
    const chatSchema = new schema.Entity('chats', { author: authorSchema });
    const chatListSchema = [chatSchema];
    const normalizedData = normalize(data, chatListSchema);
    return normalizedData
}

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}