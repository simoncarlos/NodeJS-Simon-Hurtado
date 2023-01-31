export class Chat{

    #author
    #fecha
    #mensaje
    #id

    constructor( author, fecha, mensaje, id){
        this.#author = author,
        this.#fecha = fecha,
        this.#mensaje = mensaje,
        this.#id = id
    }

    dto(){
        return{
            author: this.#author,
            fecha: this.#fecha,
            mensaje: this.#mensaje,
            id: this.#id
        }
    }
}