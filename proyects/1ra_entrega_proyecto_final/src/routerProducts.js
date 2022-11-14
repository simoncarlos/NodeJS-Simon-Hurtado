const { Router } = require("express");
const express = require("express");

const products = new Router();
const { checkAdmin } = require("./admin");
const productClass = require("./containerProduct");
const productsContainer = new productClass("products.txt");

products.use( express.json() );
products.use( express.urlencoded( { extended: true } ) ); 

function responseSend( res, product ){
    if( product.status === 200 ){
        res.send( product.data );
    }else{
        res.sendStatus( product.status );
    }
}

products.get( "/", async (req, res) => { 
    const productsList = await productsContainer.getData();
    res.send( productsList );
});

products.get( "/:id", async (req, res) => { 
    const data = await productsContainer.getDataById(req.params.id);
    responseSend( res, data );
});

products.post( "/", checkAdmin, async (req, res) => { 
    const status = await productsContainer.saveObject( req.body );
    res.sendStatus( status );
});

products.put( "/:id", checkAdmin, async(req, res) => { 
    const status = await productsContainer.updateObject( req.params.id, req.body );
    res.sendStatus( status );
});

products.delete( "/:id", checkAdmin, async (req, res) => { 
    const status = await productsContainer.deleteObject( req.params.id );
    res.sendStatus(status);
});

module.exports = {
    products
}