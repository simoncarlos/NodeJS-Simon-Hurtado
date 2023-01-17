// Services

import {
    createCartService,
    deleteCartService,
    addProductService,
    getCartProductsService,
    deleteCartProductService,
    orderControllerService
} from "../services/cartServices.js"

// Controllers

export const createCartController = async (req, res) => { 
    const idResponse = await createCartService();
    res.send( { id : idResponse } );
};

export const deleteCartController = async (req, res) => { 
    const status = await deleteCartService( req );
    res.sendStatus( status );
};

export const addProductController = async (req, res) => {
    const status = await addProductService( req );
    res.sendStatus( status );
};

export const getCartProductsController = async (req, res) => {
    const response = await getCartProductsService( req );
    if( typeof response != "number" ) res.json( response );
    else res.sendStatus( response );
};

export const deleteCartProductController = async (req, res) => {
    const status = await deleteCartProductService( req );
    res.sendStatus( status );
};

export const orderController = async (req, res) => {
    const status = await orderControllerService( req );
    res.sendStatus( status );
}