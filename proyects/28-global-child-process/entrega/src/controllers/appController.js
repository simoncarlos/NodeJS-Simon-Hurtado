import { Container } from "../persistence/container.js";

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

export const appController = async (req, res) =>{

    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    const name = req.session.username;
    //req.session.touch();
    res.render("datos", { 
        products: listProducts,
        chat: listChat,
        name: name
    });

};