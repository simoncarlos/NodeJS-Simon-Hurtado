import * as fs from 'fs';

export class Container{
    
    constructor( fileName ){
        this.fileName = fileName
    }

    async readFile(){
        try{
            const content = await fs.promises.readFile(`../database/${this.fileName}`, 'utf-8')
            return await JSON.parse(content)
        }catch(err){
            console.log(err);
        }
    }

    async saveObject( object ){
        try{
            const data = await this.readFile();
            data.push( object );
            const content = JSON.stringify( data );
            await fs.promises.writeFile(`../database/${this.fileName}`, content);
        }catch(err){
            console.log(err);
        }
    }
    
}