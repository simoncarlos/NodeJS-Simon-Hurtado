export const logoutController = (req, res) => {
    const name = req.session.username;
    req.session.destroy( err => {
        if (err) {
            res.json({ status: 'Logout ERROR', body: err });
        } else {
            res.json( { name: name } )
        }
    })
};