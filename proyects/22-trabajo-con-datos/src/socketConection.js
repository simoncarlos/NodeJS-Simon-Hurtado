import { normalize, denormalize, schema } from "normalizr";
import util from "util"
export function socketConfig ( io, productsContainer, chatContainer){

    io.on("connection", socket => {
        
        socket.emit("mensaje", "Hola, gracias por conectarte");

        socket.on( "newProduct", async product => {
            console.log(product);
            await productsContainer.saveObject(product);
            io.sockets.emit("newProduct", product);
        });

        socket.on( "newMessage", async message => {
            await chatContainer.saveObject(message);
            const data = await chatContainer.readFile();
            const dataNormalized = normalized( data )
            //print(dataNormalized)
            //console.log(dataNormalized)
            io.sockets.emit("newMessage", dataNormalized);
        });

    });

}

function normalized( data ){
    //const archive = { messages: data };
    //const chatSchema = new schema.Entity("messages", {
    //    messages: [ message ]
    //});
    //const authorSchema = new schema.Entity("authors", {
        //    author
        //});
        //const authorsSchema = new schema.Array(authorSchema);
        
    //const author = new schema.Entity("author");
    //const message = new schema.Entity("messages", { author: author } );
    //const chat = new schema.Entity('messages', {
    //    message: [message]
    //}, { idAttribute: author.email } )
        
    //const messagesSchema = new schema.Array(chat);




    //const authorSchema = new schema.Entity('authors', {}, {
    //    idAttribute: 'email'
    //});
    //const messageSchema = new schema.Entity('messages', {
    //    author: authorSchema
    //},{
    //    idAttribute: 'id'
    //});

    //////////// forma 1
    //const chat = new schema.Entity('chats');
    //const mySchema = { chats: [chat] };
//
    //const normalizedData = normalize(data, mySchema);


    //Forma 2
    const authorSchema = new schema.Entity('authors', {}, {
        idAttribute: 'email'
    });
    const chatSchema = new schema.Entity('chats', { author: authorSchema });
    const chatListSchema = [chatSchema];
    //const normalizedData = normalize(data, chatListSchema);

    //console.log(' ------------- OBJETO NORMALIZADO --------------- ')
    //console.log(normalizedData);

    //////////////////////////
    ///////////////////////////
    //////////////////
    ///////////
    //console.log(' ------------- OBJETO DENORMALIZADO --------------- ')
    //const denormalizedBlogpost = denormalize( normalizedData.result, chatListSchema, normalizedData.entities );
    //print(denormalizedBlogpost);
    //console.log(JSON.stringify(denormalizedBlogpost).length);

    const normalizedData = normalize(data, chatListSchema);
    return normalizedData
}

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}