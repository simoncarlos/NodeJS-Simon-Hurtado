const { Router } = require("express");

const products = new Router();
const { checkAdmin } = require("./admin");
const Container = require("./container");
const productsContainer = new Container("products.txt");

products.get( "/", async (req, res) => { 
    //trae todos los productos
    const productsList = await productsContainer.getData();
    res.send( productsList );
});

products.get( "/:id", async (req, res) => { 
    // trae el producto con el id = req.params.id
    const productItem = await productsContainer.getDataById(req.params.id);
    res.send( productItem );
});

products.post( "/", checkAdmin, (req, res) => { 
    // agregar producto al listado
    res.send("Products");
});

products.put( "/:id", checkAdmin, (req, res) => { 
    // actualiza producto con id = req.params.id
    res.send("Products");
});

products.delete( "/:id", checkAdmin, (req, res) => { 
    // borra producto con id = req.params.id
    res.send("Products");
});

module.exports = {
    products
}