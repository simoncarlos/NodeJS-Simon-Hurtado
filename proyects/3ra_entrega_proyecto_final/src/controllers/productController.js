import { productDao } from "../containers/daos/product/index.js";
import { getNewProductId } from "../models/productId.js";

import {
    getProductsListService,
    getProductService,
    createProductService,
    updateProductService,
    deleteProductService
} from "../services/productServices.js"


function responseSend( res, product ){
    if( product.status === 200 ){
        res.send( product.data );
    }else{
        res.sendStatus( product.status );
    }
}

export const getProductsListController = async (req, res) => { 
    const products = await getProductsListService();
    res.json(products);
};

export const getProductController = async (req, res) => { 
    const product = await getProductService( req );
    responseSend( res, product );
};

export const createProductController = async (req, res) => { 
    const status = await createProductService( req );
    res.sendStatus( status );
};

export const updateProductController = async(req, res) => { 
    const status = await updateProductService( req );
    res.sendStatus( status );
};

export const deleteProductController = async (req, res) => { 
    const status = await deleteProductService( req );
    res.sendStatus(status);
};