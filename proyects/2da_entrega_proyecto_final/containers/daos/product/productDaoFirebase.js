import firebaseContainer from "../../firebaseContainer.js"

class productDaoFirebase extends firebaseContainer {

    constructor() {
        super('productos')
    }

}

export default productDaoFirebase