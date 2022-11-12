const { Router } = require("express");
const express = require("express");

const cart = new Router();
const cartClass = require("./containerCart");
const cartContainer = new cartClass("cart.txt");
const productClass = require("./containerProduct");
const productContainer = new productClass("products.txt")

cart.use( express.json() );
cart.use( express.urlencoded( { extended: true } ) ); 

cart.post( "/", async (req, res) => { 
    const newCartId = await cartContainer.createCart();
    res.send( { id : newCartId } );
});

cart.delete( "/:id_carrito", async (req, res) => { 
    const status = await cartContainer.deleteCart(req.params.id_carrito);
    res.sendStatus( status );
});

cart.post( "/:id_cart/products", async (req, res) => {
    const validProduct = await productContainer.getDataById( req.body.id_product );
    const status = await cartContainer.addProductCart( req.params.id_cart, req.body.id_product, validProduct );
    res.sendStatus( status );
});

cart.get( "/:id_cart/products", async (req, res) => {
    const products = await productContainer.getData();
    const productsList = await cartContainer.getProductsList( req.params.id_cart, products );
    res.send( productsList );
});

module.exports = {
    cart
}