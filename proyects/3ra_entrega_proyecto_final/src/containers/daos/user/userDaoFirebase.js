import FirebaseContainer from "../../firebaseContainer.js"

class UserDaoFirebase extends FirebaseContainer {

    constructor() {
        super('users')
    }

}

export default UserDaoFirebase;