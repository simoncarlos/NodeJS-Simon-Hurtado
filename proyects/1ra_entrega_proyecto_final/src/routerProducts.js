const { Router } = require("express");
const express = require("express");

const products = new Router();
const { checkAdmin } = require("./admin");
const productClass = require("./containerProduct");
const productsContainer = new productClass("products.txt");

products.use( express.json() );
products.use( express.urlencoded( { extended: true } ) ); 

products.get( "/", async (req, res) => { 
    const productsList = await productsContainer.getData();
    res.send( productsList );
});

products.get( "/:id", async (req, res) => { 
    const productItem = await productsContainer.getDataById(req.params.id);
    res.send( productItem );
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