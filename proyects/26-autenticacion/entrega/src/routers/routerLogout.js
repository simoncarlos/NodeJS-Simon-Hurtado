import { Router } from "express";

export const logout = new Router();

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