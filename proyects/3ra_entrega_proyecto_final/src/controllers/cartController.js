import { cartDao } from "../containers/daos/cart.js";
import { productDao } from "../containers/daos/product.js";
import { getNewCartId } from "../models/cartId.js";

export const createCartController = async (req, res) => { 
    const newId = await getNewCartId();
    await cartDao.saveObject( { id : newId , productos: [] } );
    res.send( { id : newId } );
};

export const deleteCartController = async (req, res) => { 
    const status = await cartDao.deleteObject( req.params.id_carrito );
    res.sendStatus( status );
};

export const addProductController = async (req, res) => {
    const product = await productDao.getObjectById( req.body.id_product );
    const cart = await cartDao.getObjectById( req.params.id_cart );
    if( product.status === 200 && cart.status === 200 ){
        cart.data.productos.push( req.body.id_product )
        const status = await cartDao.updateObject( req.params.id_cart, cart.data )
        res.sendStatus( status )
    }else{
        res.sendStatus( 404 );
    }
};

export const getCartProductsController = async (req, res) => {
    const cart = await cartDao.getObjectById( req.params.id_cart );
    if( cart.status === 200 ){
        const productos = await productDao.getObjects();
        const productsList = productos.filter( product => cart.data.productos.includes( product.id ) );
        res.json( productsList );
    }else{
        res.sendStatus( 404 );
    }
};

export const deleteCartProductController = async (req, res) => {
    const carts = await cartDao.getObjects();
    const indexDeletedCart = carts.findIndex( cart => cart.id === parseInt( req.params.id_cart ) );
    const indexDeletedProduct = carts[ indexDeletedCart ].productos.findIndex( product => product === parseInt( req.params.id_prod ) );
    if( indexDeletedCart != -1 && indexDeletedProduct != -1 ){
        carts[ indexDeletedCart ].productos.splice( indexDeletedProduct, 1 )
        const status = await cartDao.updateObject( req.params.id_cart, carts[ indexDeletedCart ] )
        res.sendStatus( status )
    }else{
        res.sendStatus( 404 );
    }
};