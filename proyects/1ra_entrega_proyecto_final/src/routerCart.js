const { Router } = require("express");
const express = require("express");

const cart = new Router();
const cartClass = require("./containerCart");
const cartContainer = new cartClass("cart.txt");
const productClass = require("./containerProduct");
const productContainer = new productClass("products.txt")

cart.use( express.json() );
cart.use( express.urlencoded( { extended: true } ) ); 

function responseSend( res, cart ){
    if( cart.status === 200 ){
        res.send( cart.data );
    }else{
        res.sendStatus( cart.status );
    }
}

cart.post( "/", async (req, res) => { 
    const newCartId = await cartContainer.createCart();
    res.send( { id : newCartId } );
});

cart.delete( "/:id_carrito", async (req, res) => { 
    const status = await cartContainer.deleteCart(req.params.id_carrito);
    res.sendStatus( status );
});

cart.post( "/:id_cart/products", async (req, res) => {
    const data = await productContainer.getDataById( req.body.id_product );
    const status = await cartContainer.addProductCart( req.params.id_cart, req.body.id_product, data );
    res.sendStatus( status );
});

cart.get( "/:id_cart/products", async (req, res) => {
    const products = await productContainer.getData();
    const productsCart = await cartContainer.getProductsList( req.params.id_cart, products );
    responseSend(res, productsCart);
});

cart.delete( "/:id_cart/products/:id_prod", async (req, res) => {
    const status = await cartContainer.deleteProductCart( req.params.id_cart, req.params.id_prod )
    res.sendStatus( status );
});

module.exports = {
    cart
}