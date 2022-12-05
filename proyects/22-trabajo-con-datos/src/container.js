import * as fs from 'fs';

export class Container{
    
    constructor( fileName ){
        this.fileName = fileName
    }

    async readFile(){
        try{
            const content = await fs.promises.readFile(`../database/${this.fileName}`, 'utf-8')
            const data = await JSON.parse(content)
            return data//.chats
        }catch(err){
            console.log(err);
        }
    }

    async saveObject( object ){
        try{
            const data = await this.readFile();
            object.id = object.author.email;
            data.push( object );
            const content = JSON.stringify(data)//( { chats: data} );
            //const content = JSON.stringify( data );
            await fs.promises.writeFile(`../database/${this.fileName}`, content);
        }catch(err){
            console.log(err);
        }
    }
    
}