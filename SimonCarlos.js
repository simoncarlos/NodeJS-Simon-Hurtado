const fs = require("fs");
const express = require('express');

const app = express();
const PORT = 3000;

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`); 
});

server.on("error", error => console.log(`Error al establecer la conexcion con el servidor ${error}`));

app.get( '/', (req,res) =>{
    res.send({ mensaje: 'hola mundo' });
});

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
                object.id = 1;
            }
            else{
                const lastObj = data[data.length - 1 ];
                object.id = lastObj.id +1;
            }

            data.push(object);

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
            console.log("No se encontraron objetos con ese ID");
            return null
        }
    }
    async getAll(){
        try{
            const content = await fs.promises.readFile(this.name, "utf-8");
            const data = JSON.parse(content);
            return data
        }catch(err){
            console.log( err );
        }
    }
    async deleteById (number){
        try{
            const products = await fs.promises.readFile(this.name, "utf-8");
            const data = JSON.parse(products);
            if( data.length != 0 ){
                const newData = data.filter(obj => obj.id !== number)
                console.log("El nuevo objeto a ingresar es: ")
                console.log(newData);
                fs.writeFile(this.name, JSON.stringify(newData), error =>{
                    if(error){
                        console.log("Error")
                    }else{
                        console.log("Archivo corregido correctamente!")
                    }
                })
            }else{
                console.log("No hay elementos con ese ID en productos.txt")
            }
            
        }catch(err){
            console.log(err);
        }
    }
    async deleteAll(){
        await fs.promises.writeFile( this.name, JSON.stringify([]) )
        .then( console.log("Archivo vaciado correctamente") )
        .catch( console.log("Error al eliminar los objetos") )
    }
}



const archivo = new Contenedor("productos.txt");
archivo.save({title: "medias", price: 139, thumbnail: "foto1.jpg" })
archivo.getById(1).then( response =>{ console.log(response) })
archivo.getAll().then( response =>{ console.log(response) })
archivo.deleteById(2);
setTimeout(()=>{
    //archivo.deleteAll();
},2000)