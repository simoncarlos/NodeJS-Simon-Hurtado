let isAdmin = true;

function checkAdmin(req, res, next){
    if( isAdmin ){
        next()
    }else{
        res.send( { error: -1, descripcion: `ruta ${req.url}, metodo ${req.method} no autorizado` } );
    }
}

function logout(){
    isAdmin = false
}

function login(){
    isAdmin = true
}

module.exports = {
    checkAdmin, 
    logout,
    login
}