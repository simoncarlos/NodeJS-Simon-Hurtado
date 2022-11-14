const fs = require("fs");

class productClass{
    
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

    async getDataById( idParams ){
        try{
            const data = await this.getData();
            const obj = data.find( object => object.id === parseInt(idParams) )
            const status = typeof obj === "object" ? 200 : 404; 
            const response = {
                status: status,
                data: obj
            }
            return response
        }catch(err){
            console.log(err)
        }
    }

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
    }
    
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
                return 404
            }
        }catch(err){
            console.log(err)
        }
    }

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
                return 404
            }
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = productClass