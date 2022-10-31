const express = require('express');
const app = express();
const { Router } = express;
const products = new Router(); 

const PORT = process.env.PORT || 8080;

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`); 
});

server.on("error", error => console.log(`Error al establecer la conexcion con el servidor ${error}`));

app.use( "/api/productos", products);
app.use( "/static", express.static( __dirname + "/public" ) );
app.use( ( req, res, next ) => {
    res.sendStatus(404).send("Page not found");
});

products.use( express.json() );
products.use( express.urlencoded( { extended: true } ) );  

const data = [];

products.get( '/', (req,res) => {
    res.json( data );
});

products.get( '/:id', (req,res) => {

    const object = data.find( product => product.id == req.params.id ) ?? { error : "producto no encontrado" }
    res.json( object )
    
});

products.post( '/', (req,res) => {

    try{
        req.body.id = data[ data.length - 1 ].id + 1;
    }catch{
        req.body.id = 1;
    }
    data.push( req.body );
    res.json( req.body );

});

products.put( '/:id', (req,res) => {

    const index = data.findIndex( product => product.id == req.params.id  );

    if( index != -1 ){
        req.body.id = parseInt(req.params.id);
        data[ index ] = req.body;
        res.json( req.body );
    }else{
        res.json( { error : "producto no encontrado" } );
    }

});

products.delete( '/:id', (req,res) => {

    const index = data.findIndex( product => product.id == req.params.id  );

    if( index != -1 ){
        data.splice(  index, 1  );
        res.json( data );
    }else{
        res.json( { error : "producto no encontrado" } );
    }

});