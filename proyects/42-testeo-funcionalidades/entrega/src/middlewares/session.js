import session from "express-session";
import MongoStore from 'connect-mongo';

const stringMongoConnection = 'mongodb+srv://diego:contri@cluster0.lx2r1rq.mongodb.net/?retryWrites=true&w=majority';

export const sessionHandler = session({
    //store: MongoStore.create({
    //    mongoUrl: stringMongoConnection,
    //}),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
})