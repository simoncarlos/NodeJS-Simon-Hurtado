import { Router } from "express";

const cart = new Router();

// controllers 

import { 
    createCartController, 
    deleteCartController,
    addProductController,
    getCartProductsController,
    deleteCartProductController 
} from "../controllers/cartController.js";

cart.post( "/", createCartController);

cart.delete( "/:id_carrito", deleteCartController);

cart.post( "/:id_cart/products", addProductController);

cart.get( "/:id_cart/products", getCartProductsController);

cart.delete( "/:id_cart/products/:id_prod", deleteCartProductController);

export default cart;