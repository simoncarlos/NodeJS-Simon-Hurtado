import mongoDbContainer from "../../mongoContainer.js";

class productDaoMongoDb extends mongoDbContainer {

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

export default productDaoMongoDb;