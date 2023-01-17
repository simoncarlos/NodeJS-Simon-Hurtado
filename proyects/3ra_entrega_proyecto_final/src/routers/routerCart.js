import { Router } from "express";
import { requireAuth } from "../middlewares/authorization.js";

const cart = new Router();

// controllers 

import { 
    createCartController, 
    deleteCartController,
    addProductController,
    getCartProductsController,
    deleteCartProductController,
    orderController
} from "../controllers/cartController.js";

cart.post( "/", requireAuth, createCartController);

cart.delete( "/:id_carrito", requireAuth, deleteCartController);

cart.post( "/:id_cart/products", requireAuth, addProductController);

cart.get( "/:id_cart/products", requireAuth, getCartProductsController);

cart.delete( "/:id_cart/products/:id_prod", requireAuth, deleteCartProductController);

cart.get("/order/:id_cart", requireAuth, orderController);

export default cart;