import { Container } from "../persistence/container.js";

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