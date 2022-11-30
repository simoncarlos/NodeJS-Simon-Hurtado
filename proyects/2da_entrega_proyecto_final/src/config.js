import * as fs from 'fs';

const serviceAccount = JSON.parse( fs.readFileSync( "../utils/backend-coderhouse-68f3c-firebase-adminsdk-gvwwh-bd62c86a66.json", "utf8") )

const config = {
    fileSystem: {
        path: '../files'
    },
    firebase: {
        serviceAccount
    }
}

export default config