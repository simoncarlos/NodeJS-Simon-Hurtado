import { aplication } from "../../services/index.js";

export async function getProducts(){
    return await aplication.verProductos()
}

export async function getMessages(){
    return await aplication.verMensajes()
}

export async function createProduct(product){
    const returnProduct = await aplication.agregarProducto(product)
    return returnProduct
}

export async function createMessage(message){
    const returnMessage = await aplication.guardarMensaje(message)
    return returnMessage
}