import MongoDbContainer from "../../mongoContainer.js"

class CartDaoMongoDb extends MongoDbContainer {

    constructor() {
        super('carrito', {
            id: { type: Number, required: true },
            productos: { type: Array, required: true },
        })
    }
}

export default CartDaoMongoDb;