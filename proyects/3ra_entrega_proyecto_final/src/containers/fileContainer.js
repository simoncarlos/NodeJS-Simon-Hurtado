import * as fs from 'fs';

class FileContainer{
    
    constructor( fileName ){
        this.fileName = fileName
    }

    async getObjects(){
        try{
            const content = await fs.promises.readFile( this.fileName, 'utf-8');
            return await JSON.parse(content);
        }catch(err){
            console.log(`Error al leer el archivo. Error: ${err}`);
        }
    }

    async getObjectById( idParam ){
        try{
            const data = await this.getObjects();
            const object = data.find( object => object.id === parseInt(idParam) );
            const status = typeof object === "object" ? 200 : 404; 
            const response = {
                status: status,
                data: object
            };
            return response
        }catch(err){
            console.log( `Error al obtener el objecto con el id: ${idParam}. Error: ${err}` );
        }
    }

    async saveObject( object ){
        try{
            const data = await this.getObjects();
            data.push( object );
            const content = JSON.stringify( data );
            await fs.promises.writeFile( this.fileName , content);
            return 200
        }catch(err){
            console.log( `Error al guardar el objecto: ${object}. Error: ${err}` );
        }
    }

    async updateObject( idParam, bodyRequest ){
        try{
            const data = await this.getObjects();
            bodyRequest.id = parseInt(idParam);
            const indexUpdate = data.findIndex( object => object.id === parseInt(idParam) );
            if( indexUpdate != -1 ){
                data[ indexUpdate ] = bodyRequest;
                const content = JSON.stringify( data );
                await fs.promises.writeFile(this.fileName, content);
                return 200
            }else{
                return 404
            }
        }catch(err){
            console.log( `Error al actualizar el objecto con id: ${idParam}. Error: ${err}` )
        }
    }

    async deleteObject( idParam ){
        try{
            const data = await this.getObjects();
            const indexDelete = await data.findIndex( object => object.id === parseInt(idParam) );
            if( indexDelete != -1 ){
                data.splice( indexDelete, 1);
                const content = JSON.stringify( data );
                await fs.promises.writeFile( this.fileName, content);
                return 200
            }else{
                return 404
            }
        }catch(err){
            console.log(  `Error al eliminar el objecto con id: ${idParam}. Error: ${err}`  )
        }
    }

}

export default FileContainer;