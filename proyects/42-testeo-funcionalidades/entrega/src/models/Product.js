export class Product{
    
    #nombre
    #precio
    #thumbnail
    
    constructor( nombre, precio, thumbnail ){
        this.#nombre = nombre,
        this.#precio = precio,
        this.#thumbnail = thumbnail
    }

    dto(){
        return{
            nombre: this.#nombre,
            precio: this.#precio,
            thumbnail: this.#thumbnail
        }
    }

}