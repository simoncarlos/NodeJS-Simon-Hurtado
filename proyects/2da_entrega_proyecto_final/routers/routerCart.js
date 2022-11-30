import express, { Router } from "express";
import { cartDao } from "../containers/daos/cart/index.js";
import { productDao } from "../containers/daos/product/index.js";

const cart = new Router();

cart.use( express.json() );
cart.use( express.urlencoded( { extended: true } ) );

function responseSend( res, cart ){
    if( cart.status === 200 ){
        res.send( cart.data );
    }else{
        res.sendStatus( cart.status );
    }
}

async function getNewId(){
    const data = await cartDao.getObjects();
    if( data.length ){
        return data[ data.length - 1 ].id + 1
    }else{
        return 1
    }
}

function getPositionCart(){

}

//cart.get( "/", async (req, res) => { // de prueba, eliminar luego
//    const cart = await cartDao.getObjects();
//    res.json( cart );
//});

cart.post( "/", async (req, res) => { 
    const newId = await getNewId();
    await cartDao.saveObject( { id : newId , productos: [] } );
    res.send( { id : newId } );
});

cart.delete( "/:id_carrito", async (req, res) => { 
    const status = await cartDao.deleteObject( req.params.id_carrito );
    res.sendStatus( status );
});

cart.post( "/:id_cart/products", async (req, res) => {
    const product = await productDao.getObjectById( req.body.id_product );
    const cart = await cartDao.getObjectById( req.params.id_cart );
    if( product.status === 200 && cart.status === 200 ){
        cart.data.productos.push( req.body.id_product )
        const status = await cartDao.updateObject( req.params.id_cart, cart.data )
        res.sendStatus( status )
    }else{
        res.sendStatus( 404 );
    }
});

cart.get( "/:id_cart/products", async (req, res) => {
    const cart = await cartDao.getObjectById( req.params.id_cart );
    if( cart.status === 200 ){
        const productos = await productDao.getObjects();
        const productsList = productos.filter( product => cart.data.productos.includes( product.id ) );
        res.json( productsList );
    }else{
        res.sendStatus( 404 );
    }
});

cart.delete( "/:id_cart/products/:id_prod", async (req, res) => {
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
});

export default cart;