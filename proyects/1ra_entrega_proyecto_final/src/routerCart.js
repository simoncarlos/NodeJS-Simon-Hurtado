const { Router } = require("express");

const cart = new Router();

cart.get( "/", (req, res) => { 
    res.send("Cart");
});

module.exports = {
    cart
}