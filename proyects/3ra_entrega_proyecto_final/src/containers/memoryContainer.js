
class MemoryContainer{
    
    constructor(){
        this.data = [];
    }

    getObjects(){
        try{
            return this.data
        }catch(err){
            console.log(`Error al leer el archivo. Error: ${err}`);
        }
    }

    getObjectById( idParam ){
        try{
            const object = this.data.find( object => object.id === parseInt(idParam) );
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

    saveObject( object ){
        try{
            this.data.push( object );
            return 200
        }catch(err){
            console.log( `Error al guardar el objecto: ${object}. Error: ${err}` );
        }
    }

    updateObject( idParam, bodyRequest ){
        try{
            bodyRequest.id = parseInt(idParam);
            const indexUpdate = this.data.findIndex( object => object.id === parseInt(idParam) );
            if( indexUpdate != -1 ){
                this.data[ indexUpdate ] = bodyRequest;
                return 200
            }else{
                return 404
            }
        }catch(err){
            console.log( `Error al actualizar el objecto con id: ${idParam}. Error: ${err}` )
        }
    }

    deleteObject( idParam ){
        try{
            const indexDelete = this.data.findIndex( object => object.id === parseInt(idParam) );
            if( indexDelete != -1 ){
                this.data.splice( indexDelete, 1);
                return 200
            }else{
                return 404
            }
        }catch(err){
            console.log(  `Error al eliminar el objecto con id: ${idParam}. Error: ${err}`  )
        }
    }

}

export default MemoryContainer;