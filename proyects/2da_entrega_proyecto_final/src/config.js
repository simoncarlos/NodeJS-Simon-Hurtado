import * as fs from 'fs';
import mongoose from 'mongoose';

const serviceAccount = JSON.parse( fs.readFileSync( "../utils/backend-coderhouse-68f3c-firebase-adminsdk-gvwwh-bd62c86a66.json", "utf8") )

const config = {
    fileSystem: {
        path: '../files'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://diego:contri@cluster0.lx2r1rq.mongodb.net/?retryWrites=true&w=majority',
        options: {
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        serviceAccount
    }
};

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

export default config