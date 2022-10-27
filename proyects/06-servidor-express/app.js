const fs = require("fs");
const express = require('express');

const app = express();
const PORT = 8080;

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`); 
});

server.on("error", error => console.log(`Error al establecer la conexcion con el servidor ${error}`));

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
            console.log(content);
            const data = JSON.parse(content);
            console.log(data);
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
    async getRandomObject (){
        try{
            const data = await fs.promises.readFile(this.name, "utf-8");
            const dataParsed = JSON.parse(data);
            if( dataParsed.length ){
                const randomPosition =  Math.floor( Math.random() * dataParsed.length  );
                console.log(dataParsed[randomPosition]);
                return dataParsed[randomPosition]
            }else{
                return null
            }
        }
        catch(err){
            console.log(err);
        }
    }
}

app.get( '/productos', (req,res) => {
    const archivo = new Contenedor("productos.txt");
    archivo.getAll().then( response => { res.send( response ) } );
});

app.get( '/productoRandom', (req,res) => {
    const archivo = new Contenedor("productos.txt");
    archivo.getRandomObject().then( response => { res.send( response ) })
});