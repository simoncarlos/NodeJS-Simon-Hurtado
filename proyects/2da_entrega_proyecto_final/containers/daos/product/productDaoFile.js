import fileContainer from "../../fileContainer.js";

class productDaoFile extends fileContainer{

    constructor( routeDir ) {
        super(`${routeDir}/product.json`)
    }

}

export default productDaoFile;