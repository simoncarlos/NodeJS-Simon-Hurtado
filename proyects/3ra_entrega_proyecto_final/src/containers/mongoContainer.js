import mongoose, { Schema, model }  from "mongoose";


class MongoDbContainer{

    constructor( nameCollection, schema) {
        this.collection = mongoose.model( nameCollection, new Schema( schema ) )
    }

    async getObjects(){
        try{
            return await this.collection.find({})
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
            await this.collection.create( { ...object } );
            return 200
        }catch(err){
            console.log( `Error al guardar el objecto: ${object}. Error: ${err}` );
        }
    }

    async updateObject( idParam, bodyRequest ){
        try{
            const response = await this.getObjectById( parseInt(idParam) )
            if( response.status === 200 ){
                await this.collection.updateOne( { id: idParam }, bodyRequest );
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
            const response = await this.getObjectById( idParam );
            if( response.status === 200 ){
                await this.collection.deleteOne( { id: idParam } )
                return 200
            }else{
                return 404
            }
        }catch(err){
            console.log(  `Error al eliminar el objecto con id: ${idParam}. Error: ${err}`  )
        }
    }

};

export default MongoDbContainer;