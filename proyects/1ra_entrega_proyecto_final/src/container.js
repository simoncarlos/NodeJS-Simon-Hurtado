const fs = require("fs");

class Container{
    
    constructor( fileName ){
        this.fileName = fileName
        this.data = []
    }

    async getData(){
        try{
            const content = await fs.promises.readFile(`../files/${this.fileName}`, 'utf-8')
            this.data = await JSON.parse(content);
            return this.data
        }catch(err){
            console.log(err);
        }
    }

    async getDataById( idParams ){
        try{
            const content = await fs.promises.readFile(`../files/${this.fileName}`, 'utf-8');
            const data = await JSON.parse(content);
            const obj = data.find( object => object.id === idParams ) || "No se encontraron productos"
            console.log(obj);
            return obj
        }catch(err){
            console.log(err)
        }
    }

    async saveObject( object ){
        try{
            this.data.push(object)
            const content = JSON.stringify(this.data)
            await fs.promises.writeFile(`../files/${this.fileName}`, content)
        }catch(err){
            console.log(err);
        }
    }
    
}

module.exports = Container