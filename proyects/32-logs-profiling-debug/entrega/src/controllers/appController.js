import { Container } from "../persistence/container.js";
import { loggerConsole } from "../logConfig.js";

const productsContainer = new Container("products.txt");
const chatContainer = new Container("chat.txt");

export const appController = async (req, res) =>{

    const listProducts = await productsContainer.readFile();
    const listChat = await chatContainer.readFile();
    const name = req.session.username;
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    res.render("datos", { 
        products: listProducts,
        chat: listChat,
        name: name
    });

};