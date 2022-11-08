const fs = require("fs");

class Container{
    
    constructor( fileName ){
        this.fileName = fileName
        this.data = []
    }

    async readFile(){
        try{
            const content = await fs.promises.readFile(`../${this.fileName}`, 'utf-8')
            this.data = await JSON.parse(content);
            return this.data
        }catch(err){
            console.log(err);
        }
    }

    async saveObject( object ){
        try{
            this.data.push(object)
            const content = JSON.stringify(this.data)
            await fs.promises.writeFile(`../${this.fileName}`, content)
        }catch(err){
            console.log(err);
        }
    }
    
}

module.exports = Container