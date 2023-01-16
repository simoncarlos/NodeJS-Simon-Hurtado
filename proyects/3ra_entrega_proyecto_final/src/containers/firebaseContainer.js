import admin from "firebase-admin";
import config from "../src/config.js";

admin.initializeApp({
    credential: admin.credential.cert( config.firebase )
});

const db = admin.firestore();

class FirebaseContainer{
    
    constructor( collectionName ) {
        this.collection = db.collection( collectionName )
    }

    asObj( doc ) {
        return { id: parseInt(doc.id), ...doc.data() }
    }

    async getObjects(){
        try{
            const data = [];
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
                data.push(this.asObj(doc))
            })
            return data
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
            await this.collection.doc( `${object.id}` ).set( { ...object } );
            return 200
        }catch(err){
            console.log( `Error al guardar el objecto: ${object}. Error: ${err}` );
        }
    }

    async updateObject( idParam, bodyRequest ){
        try{
            const response = await this.getObjectById( parseInt(idParam) )
            if( response.status === 200 ){
                await this.collection.doc( `${idParam}` ).update( { ...bodyRequest } );
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
                await this.collection.doc( `${idParam}` ).delete();
                return 200
            }else{
                return 404
            }
        }catch(err){
            console.log(  `Error al eliminar el objecto con id: ${idParam}. Error: ${err}`  )
        }
    }

}

export default FirebaseContainer;