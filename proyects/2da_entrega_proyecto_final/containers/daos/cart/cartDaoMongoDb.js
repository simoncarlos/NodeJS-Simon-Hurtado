import mongoDbContainer from "../../mongoContainer.js"

class cartDaoMongoDb extends mongoDbContainer {

    constructor() {
        super('carrito', {
            id: { type: Number, required: true },
            productos: { type: Array, required: true },
        })
    }
}

export default cartDaoMongoDb;