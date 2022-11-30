let isAdmin = true;

export function checkAdmin(req, res, next){
    if( isAdmin ){
        next()
    }else{
        res.send( { error: -1, descripcion: `ruta ${req.url}, metodo ${req.method} no autorizado` } );
    }
}

export function logout(){
    isAdmin = false
}

export function login(){
    isAdmin = true
}