let isAdmin = true;

function checkAdmin(req, res, next){
    if( isAdmin ){
        next()
    }else{
        res.sendStatus(403)
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