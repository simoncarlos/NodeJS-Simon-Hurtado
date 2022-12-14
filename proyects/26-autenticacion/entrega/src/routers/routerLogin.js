import { Router } from "express";

export const login = new Router();

login.get('/', (req, res) => { 
    res.render( "login" ); 
});

login.post("/", (req, res) => {

    if ( req.body.username !== 'pepe') {
        return res.send('Fallo de logueo')
    }

    req.session.username = req.body.username;
    res.redirect("../aplication");

});