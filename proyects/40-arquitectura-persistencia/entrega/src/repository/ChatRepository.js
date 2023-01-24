import { Chat } from "../models/chat.js";

export class ChatList{
    
    #daoChat

    constructor(daoChat){
        this.#daoChat = daoChat
    }

    async obtener(){
        const dtoChats = await this.#daoChat.readFile();
        const instanciasChats = dtoChats.map( dto => {
            let author = dto.author;
            let fecha = dto.fecha;
            let mensaje = dto.mensaje;
            let id = dto.id;
            return new Chat( author, fecha, mensaje, id)
        });
        return instanciasChats
    }

    async guardar( instanciaChat ){
        const dtoChat = instanciaChat.dto();
        await this.#daoChat.saveObject( dtoChat );
    }


}