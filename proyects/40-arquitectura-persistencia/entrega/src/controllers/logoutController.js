import { loggerConsole } from "../logConfig.js";

export const logoutController = (req, res) => {
    const name = req.session.username;
    loggerConsole.info(`Ruta: ${req.url}, metodo: ${req.method}`);
    req.session.destroy( err => {
        if (err) {
            res.json({ status: 'Logout ERROR', body: err });
        } else {
            res.render( "logout", { name: name } )
        }
    })
};