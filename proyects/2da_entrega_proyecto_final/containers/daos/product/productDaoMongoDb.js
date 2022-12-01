import MongoDbContainer from "../../mongoContainer.js";

class ProductDaoMongoDb extends MongoDbContainer {

    constructor() {
        super('productos', {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
        })
    }
}

export default ProductDaoMongoDb;