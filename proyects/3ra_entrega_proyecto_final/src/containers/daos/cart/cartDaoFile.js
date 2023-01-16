import FileContainer from "../../fileContainer.js";

class CartDaoFile extends FileContainer{

    constructor( routeDir ) {
        super(`${routeDir}/cart.json`)
    }

}

export default CartDaoFile;