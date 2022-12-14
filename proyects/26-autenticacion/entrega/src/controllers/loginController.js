export const loginController = (req, res) => { 
    res.render( "login" ); 
};

export const loginSucessfulControler = (req, res) => {
    req.session.username = req.body.username;
    res.redirect("../aplication");
};