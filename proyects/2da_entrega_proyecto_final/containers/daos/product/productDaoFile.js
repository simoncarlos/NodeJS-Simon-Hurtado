import FileContainer from "../../fileContainer.js";

class ProductDaoFile extends FileContainer{

    constructor( routeDir ) {
        super(`${routeDir}/product.json`)
    }

}

export default ProductDaoFile;