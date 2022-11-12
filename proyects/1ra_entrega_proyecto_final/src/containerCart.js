const fs = require("fs");

class cartClass{
    
    constructor( fileName ){
        this.fileName = fileName
    }

    async getData(){
        try{
            const content = await fs.promises.readFile(`../files/${this.fileName}`, 'utf-8')
            return await JSON.parse(content)  ;//await JSON.parse(content);
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

    async getDataById( idParams ){
        try{
            const content = await fs.promises.readFile(`../files/${this.fileName}`, 'utf-8');
            const data = await JSON.parse(content);
            const obj = data.find( object => object.id === parseInt(idParams) ) || "No se encontraron datos"
            return obj
        }catch(err){
            console.log(err)
        }
    } //

    async saveObject( obj ){
        try{
            const data = await this.getData();
            let newId = data.length ? data[ data.length - 1 ].id + 1  : 1
            obj.id = newId;
            data.push( obj );
            const content = JSON.stringify( data );
            await fs.promises.writeFile(`../files/${this.fileName}`, content);
            return 200
        }catch(err){
            console.log(err);
        }
    } //
    
    async updateObject( idParams, bodyRequest ){
        try{
            const data = await this.getData();
            bodyRequest.id = parseInt(idParams);
            const indexUpdate = data.findIndex( object => object.id === parseInt(idParams) );
            if( indexUpdate != -1 ){
                data[ indexUpdate ] = bodyRequest;
                const content = JSON.stringify( data );
                await fs.promises.writeFile(`../files/${this.fileName}`, content);
                return 200
            }else{
                return 400
            }
        }catch(err){
            console.log(err)
        }
    } //

    async deleteObject( idParams ){
        try{
            const data = await this.getData();
            const indexDelete = await data.findIndex( object => object.id === parseInt(idParams) );
            if( indexDelete != -1 ){
                data.splice( indexDelete, 1);
                const content = JSON.stringify( data );
                await fs.promises.writeFile(`../files/${this.fileName}`, content);
                return 200
            }else{
                return 400
            }
        }catch(err){
            console.log(err)
        }
    } //

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
        
    }

}

module.exports = cartClass