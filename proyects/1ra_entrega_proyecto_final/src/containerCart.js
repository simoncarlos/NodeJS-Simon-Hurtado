const fs = require("fs");

class cartClass{
    
    constructor( fileName ){
        this.fileName = fileName
    }

    async getData(){
        try{
            const content = await fs.promises.readFile(`../files/${this.fileName}`, 'utf-8')
            return await JSON.parse(content);
        }catch(err){
            console.log(err);
        }
    }

    async postData( data ){
        try{
            const content = JSON.stringify( data );
            await fs.promises.writeFile(`../files/${this.fileName}`, content);
        }catch(err){
            console.log(err);
        }
    }

    async createCart(){
        try{
            const cartList = await this.getData();
            const newId = cartList.length ? cartList[ cartList.length - 1 ].id + 1  : 1 ;
            const newCart = { id : newId , productos: [] } ;
            cartList.push( newCart );
            await this.postData( cartList );
            return newId
        }catch{
            return 0
        }
    }

    async deleteCart( idCartDeleted ){
        const cartList = await this.getData();
        console.log( idCartDeleted ); 
        const indexCartDeleted = cartList.findIndex( cart => cart.id === parseInt(idCartDeleted) );
        if( indexCartDeleted != -1 ){
            cartList.splice( indexCartDeleted, 1 );
            await this.postData(cartList);
            return 200
        }else{
            return 400
        }
    }
    
    async addProductCart ( idCart, idProduct, validProduct ){
        const cartList = await this.getData();
        const indexCart = cartList.findIndex( cart => cart.id === parseInt(idCart) );
        if( indexCart != -1 && ( typeof validProduct != "string" ) ){
            cartList[ indexCart ].productos.push( idProduct );
            await this.postData(cartList);
            return 200;
        }else{
            return 400
        }
    }

    async getProductsList ( idCart, products ){

        const cartList = await this.getData();
        const productsListId = cartList.find( cart => cart.id === parseInt(idCart) );

        if( productsListId != undefined ){
            const productsList = products.filter( product => productsListId.productos.includes( product.id ) );
            return productsList;
        }else{
            return "No se encontraron productos";
        }

    }

    async deleteProductCart ( idCart, idProduct ){
        const cartList = await this.getData();
        const indexDeletedCart = cartList.findIndex( cart => cart.id === parseInt(idCart) );
        if( indexDeletedCart != -1 ){
            const indexDeletedProduct = cartList[ indexDeletedCart ].productos.findIndex( producto => producto === parseInt(idProduct) );
            if( indexDeletedProduct != -1 ){
                cartList[ indexDeletedCart ].productos.splice( indexDeletedProduct, 1 )
                await this.postData( cartList );
                return 200
            }
        }
        return 403
    }

}

module.exports = cartClass