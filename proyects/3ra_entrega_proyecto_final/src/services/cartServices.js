import { clienteMail } from './messageSenders/emailSender/index.js'
import { productDao } from "../containers/daos/product/index.js";
import { cartDao } from "../containers/daos/cart/index.js";
import { getNewCartId } from "../models/cartId.js";
import { smsAdmin ,emailAdmin } from '../config.js';
import { loggerConsole } from '../config.js';

export const createCartService = async () => {
    const newId = await getNewCartId();
    await cartDao.saveObject( { id : newId , productos: [] } );
    return newId
};

export const deleteCartService = async ( req ) => {
    const status = await cartDao.deleteObject( req.params.id_carrito );
    return status
;}

export const addProductService = async ( req ) => {
    const product = await productDao.getObjectById( req.body.id_product );
    const cart = await cartDao.getObjectById( req.params.id_cart );
    if( product.status === 200 && cart.status === 200 ){
        cart.data.productos.push( req.body.id_product )
        const status = await cartDao.updateObject( req.params.id_cart, cart.data )
        return status
    }else{
        return 404
    }
};

export const getCartProductsService = async ( req ) => {
    const cart = await cartDao.getObjectById( req.params.id_cart );
    if( cart.status === 200 ){
        const productos = await productDao.getObjects();
        const productsList = productos.filter( product => cart.data.productos.includes( product.id ) );
        return productsList;
    }else{
        return 404;
    }
};

export const deleteCartProductService = async ( req ) => {
    const carts = await cartDao.getObjects();
    const indexDeletedCart = carts.findIndex( cart => cart.id === parseInt( req.params.id_cart ) );
    const indexDeletedProduct = carts[ indexDeletedCart ].productos.findIndex( product => product === parseInt( req.params.id_prod ) );
    if( indexDeletedCart != -1 && indexDeletedProduct != -1 ){
        carts[ indexDeletedCart ].productos.splice( indexDeletedProduct, 1 )
        const status = await cartDao.updateObject( req.params.id_cart, carts[ indexDeletedCart ] )
        return status;
    }else{
        return 404;
    }
};

export const orderControllerService = async ( req ) => {
    const cart = await cartDao.getObjectById( req.params.id_cart );
    if( cart.status === 200 ){
        const productos = await productDao.getObjects();
        const productsList = productos.filter( product => cart.data.productos.includes( product.id ) );
        
        //await clienteMail.enviar({ asunto: 'Nuevo Pedido', destinatario: emailAdmin, mensaje: productsList })
        //await clienteSms.enviar({ numero: smsAdmin, texto: "Su pedido fue recibido!" })
        //await clienteWsp.enviar({ numero: smsAdmin, texto: `Su pedido fue recibido con exito!` })
        loggerConsole.info("Mensajes(mail, sms, wpp) enviados con el listado ", productsList);
        const status = await cartDao.deleteObject( req.params.id_cart );
        return status;
    }else{
        return 404;
    }
};