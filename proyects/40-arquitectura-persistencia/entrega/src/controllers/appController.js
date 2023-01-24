import { appService } from "../services/appServices.js";
import { loggerConsole } from "../logConfig.js";
import { aplication } from "../services/index.js";

export const appController = async (req, res) => {
    try{
        const listaProductos = await aplication.verProductos();
        const listaChats = await aplication.verMensajes();
        const name = req.session.username;
        loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
        const data = { 
            products: listaProductos,
            chat: listaChats,
            name: name
        }
        res.render("datos", data);
    }catch(error){
        console.log(error)
    }
};