import express, { Router } from "express";

const logout = new Router();

logout.use( express.json() );
logout.use( express.urlencoded( { extended: true } ) );

logout.get('/', (req, res) => {

    const name = req.session.username;

    req.session.destroy( err => {
        if (err) {
            res.json({ status: 'Logout ERROR', body: err });
        } else {
            res.render( "logout", { name: name } )
        }
    })

});

export default logout;