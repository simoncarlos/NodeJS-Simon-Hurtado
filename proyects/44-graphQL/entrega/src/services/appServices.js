import { Container } from "../persistence/container.js";
import { Product } from "../models/Product.js";
import { Chat } from "../models/chat.js";

export const appService = async ( req ) => {
    const productsContainer = new Container("products.txt");
    const chatContainer = new Container("chat.txt");
    
    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    const name = req.session.username;

    return { 
        products: listProducts,
        chat: listChat,
        name: name
    }

};

export class Aplication {
    #productList
    #chatList
    
    constructor( productList, chatList ){
        this.#productList = productList
        this.#chatList = chatList
    }

    async agregarProducto( datosProducto ){
        const object = { 
            nombre: datosProducto.datos.nombre,
            precio: datosProducto.datos.precio,
            thumbnail: datosProducto.datos.thumbnail
        }
        const product = new Product( object.nombre, object.precio, object.thumbnail);
        await this.#productList.guardar(product);
        return object
    }

    async guardarMensaje( datosMensaje ){
        const object = {
            author: datosMensaje.datos.author,
            fecha: datosMensaje.datos.fecha,
            mensaje: datosMensaje.datos.mensaje
        }
        const chat = new Chat( object.author, object.fecha, object.mensaje );
        await this.#chatList.guardar(chat)
        return object
    }

    async verProductos(){
        const listaProductos = await this.#productList.obtener()
        return listaProductos.map( p => p.dto() )
    }

    async verMensajes(){
        const listaMensajes = await this.#chatList.obtener()
        return listaMensajes.map( m => m.dto() );
    }
}
