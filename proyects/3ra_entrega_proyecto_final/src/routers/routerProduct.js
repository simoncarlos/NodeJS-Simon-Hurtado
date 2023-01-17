import { Router } from "express";
import { requireAuth } from "../middlewares/authorization.js";

const products = new Router();

// Controllers

import { 
    getProductsListController, 
    getProductController,
    createProductController,
    updateProductController,
    deleteProductController
} from "../controllers/productController.js";

products.get( "/", getProductsListController);

products.get( "/:id", getProductController);

products.post( "/", requireAuth, createProductController);

products.put( "/:id", requireAuth, updateProductController);

products.delete( "/:id", requireAuth, deleteProductController);

export default products;