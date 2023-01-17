import MongoDbContainer from "../../mongoContainer.js";

class userDaoMongoDb extends MongoDbContainer {

    constructor() {
        super('users', {
            id: { type: Number, required: true },
            username: { type: String, required: true },
            email: { type: String, required: true },
            image: { type: String, required: true },
            lastname: { type: Number, required: true },
        })
    }
}

export default userDaoMongoDb;