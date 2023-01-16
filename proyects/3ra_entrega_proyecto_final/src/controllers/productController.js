import { productDao } from "../containers/daos/product.js";
import { getNewProductId } from "../models/productId.js";

function responseSend( res, product ){
    if( product.status === 200 ){
        res.send( product.data );
    }else{
        res.sendStatus( product.status );
    }
}

export const getProductsListController = async (req, res) => { 
    const products = await productDao.getObjects();
    res.json(products);
};

export const getProductController = async (req, res) => { 
    const product = await productDao.getObjectById(req.params.id);
    responseSend( res, product );
};

export const createProductController = async (req, res) => { 
    req.body.id = await getNewProductId();
    const status = await productDao.saveObject( req.body );
    res.sendStatus( status );
};

export const updateProductController = async(req, res) => { 
    const status = await productDao.updateObject( req.params.id, req.body );
    res.sendStatus( status );
};

export const deleteProductController = async (req, res) => { 
    const status = await productDao.deleteObject( req.params.id );
    res.sendStatus(status);
};