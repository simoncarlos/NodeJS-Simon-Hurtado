import express, { Router } from "express";

const login = new Router();

login.use( express.json() );
login.use( express.urlencoded( { extended: true } ) );

login.get('/', (req, res) => { 
    res.render( "login" ); 
});

login.post("/", (req, res) => {

    if ( req.body.username !== 'pepe') {
        return res.send('Fallo de logueo')
    }

    req.session.username = req.body.username;
    res.redirect("../aplication");

})


export default login;