import { Product } from "../models/Product.js";

export class ProductList{
    
    #daoProducts

    constructor(daoProducts){
        this.#daoProducts = daoProducts
    }

    async obtener(){
        const dtoProducts = await this.#daoProducts.readFile();
        const instanciasProductos = dtoProducts.map( dto => {
            let nombre = dto.nombre;
            let precio = dto.precio;
            let thumbnail = dto.thumbnail;
            return new Product( nombre, precio, thumbnail)
        });
        return instanciasProductos
    }

    async guardar( instanciaProducto ){
        const dtoProduct = instanciaProducto.dto();
        await this.#daoProducts.saveObject( dtoProduct );
    }

}