const fs = require("fs");

class Container{
    
    constructor( fileName, database, table ){
        this.fileName = fileName,
        this.database = database,
        this.table = table,
        this.data = [],
        this.createDb()
    }

    async createDb(){
        const exist = await this.database.schema.hasTable( this.table );
        if( !exist && this.table == "productos" ){
            await this.database.schema.createTable( this.table , table => {
                table.integer("nombre"),
                    table.string("precio"),
                    table.integer("thumbnail")
            });
        }
        if( !exist && this.table == "chat" ){
            await this.database.schema.createTable( this.table , table => {
                table.integer("email"),
                    table.string("fecha"),
                    table.integer("mensaje")
            });
        }
    }

    async readFile(){
        try{
            const objects = await this.database.select().from(this.table);
            console.log(objects) 
            return objects;
        }catch(err){
            console.log(err);
        }
    }

    async saveObject( object ){
        try{
            await this.database.insert( object ).into(this.table);
        }catch(err){
            console.log(err);
        }
    }
    
}

module.exports = Container