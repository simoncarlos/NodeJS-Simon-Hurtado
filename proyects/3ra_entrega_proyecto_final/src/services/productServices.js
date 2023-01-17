import { productDao } from "../containers/daos/product/index.js";
import { getNewProductId } from "../models/productId.js";

export const getProductsListService = async () => {
    return await productDao.getObjects();
}

export const getProductService = async ( req ) => {
    return await productDao.getObjectById(req.params.id);
}

export const createProductService = async ( req ) => {
    req.body.id = await getNewProductId();
    return await productDao.saveObject( req.body );
}

export const updateProductService = async ( req ) => {
    return await productDao.updateObject( req.params.id, req.body );
};

export const deleteProductService = async ( req ) => {
    return await productDao.deleteObject( req.params.id );
};

