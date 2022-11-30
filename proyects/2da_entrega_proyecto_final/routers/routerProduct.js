import express, { Router } from "express";
import { checkAdmin } from "../src/admins.js";
import { productDao } from "../containers/daos/product/index.js";

const products = new Router();

products.use( express.json() );
products.use( express.urlencoded( { extended: true } ) );

function responseSend( res, product ){
    if( product.status === 200 ){
        res.send( product.data );
    }else{
        res.sendStatus( product.status );
    }
}

async function getNewId(){
    const data = await productDao.getObjects();
    if( data.length ){
        return data[ data.length - 1 ].id + 1
    }else{
        return 1
    }
}

products.get( "/", async (req, res) => { 
    const products = await productDao.getObjects();
    res.json(products);
});

products.get( "/:id", async (req, res) => { 
    const product = await productDao.getObjectById(req.params.id);
    responseSend( res, product );
});

products.post( "/", checkAdmin, async (req, res) => { 
    req.body.id = await getNewId();
    const status = await productDao.saveObject( req.body );
    res.sendStatus( status );
});

products.put( "/:id", checkAdmin, async(req, res) => { 
    const status = await productDao.updateObject( req.params.id, req.body );
    res.sendStatus( status );
});

products.delete( "/:id", checkAdmin, async (req, res) => { 
    const status = await productDao.deleteObject( req.params.id );
    res.sendStatus(status);
});

export default products;