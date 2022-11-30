import fileContainer from "../../fileContainer.js";

class cartDaoFile extends fileContainer{

    constructor( routeDir ) {
        super(`${routeDir}/cart.json`)
    }

}

export default cartDaoFile;