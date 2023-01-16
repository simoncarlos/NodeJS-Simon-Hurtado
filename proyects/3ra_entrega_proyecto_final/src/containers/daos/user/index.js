import config, { TYPE_PERS } from "../../../config.js"

let userDao

switch ( TYPE_PERS ) {
    case 'json':
        const { default: userDaoFile } = await import('./userDaoFile.js');
        userDao = new userDaoFile(config.fileSystem.path)
        break
    case 'firebase':
        const { default: userDaoFirebase } = await import('./userDaoFirebase.js')
        userDao = new userDaoFirebase()
        break
    case 'mongodb':
        const { default: userDaoMongoDb } = await import('./userDaoMongoDb.js')
        userDao = new userDaoMongoDb()
        break
    default:
        const { default: userDaoMemory } = await import('./userDaoMemory.js')
        userDao = new userDaoMemory()
        break
}

export { userDao }