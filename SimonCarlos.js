const fs = require("fs");

class Contenedor{
    
    constructor(name){
        this.name = name;
    }
    read(){
        try{
            const data = fs.readFileSync(this.name, "utf-8");
            return data
        }
        catch (err) {
            console.log(err);
        }
    }
    async save(object){
        try {
            const content = this.read();
            const data = JSON.parse(content);
            
            if( data.length == 0  ){
                object.id = 0;
            }
            else{
                const lastObj = data[data.length - 1 ];
                object.id = lastObj.id +1;
            }

            data.push(object);

            console.log("El objeto a salvar es: ")
            console.log(data)

            fs.promises.writeFile(this.name, JSON.stringify(data));
            return object.id;
        } catch (error) {
            console.log("error");
        }
    }
    async getById( number ){
        try{
            const content = await fs.promises.readFile(this.name, "utf-8");
            const data =  JSON.parse(content);
            const response = data.find( obj => obj.id == number );
            return (response != undefined) ? JSON.stringify(response) : null
        }catch(err){
            console.log("Error en el getById \n" + err );
        }
    }
    async getAll(){
        try{
            const content = await fs.promises.readFile(this.name, "utf-8");
            const data = JSON.parse(content);
            return data
        }catch(err){
            console.log("Error en el getAll \n" + err );
        }
    }
    async deleteById (number){
        try{
            const products = await fs.promises.readFile(this.name, "utf-8");
            const data = JSON.parse(products);

            const newData = data.filter(obj => obj.id !== number)
            console.log("El nuevo objeto a ingresar es: ")
            console.log(newData);
            fs.writeFile(this.name, JSON.stringify(newData), error =>{
                if(error){
                    console.log("Se ha eliminado el objeto con el id: "+number)
                }else{
                    console.log("Archivo corregido correctamente!")
                }
            })
        }catch(err){
            console.log(err);
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile( this.name, "" );
            console.log("Borrado realizado exitosamente")
        }catch(err){
            console.log(err);
        }
    }
}



const archivo = new Contenedor("productos.txt");
archivo.save({title: "medias", price: 139, thumbnail: "foto1.jpg" })
archivo.getById(1).then( response =>{ console.log(response) })
archivo.getAll().then( response =>{ console.log(response) })
archivo.deleteById(5);
archivo.deleteAll();