import FileContainer from "../../fileContainer.js";

class UserDaoFile extends FileContainer{

    constructor( routeDir ) {
        super(`${routeDir}/users.json`)
    }

}

export default UserDaoFile;