import config from '../../../src/config.js'

let cartDao

// process.env.PERS

switch ( "firebase" ) {
    case 'json':
        const { default: cartDaoFile } = await import('./cartDaoFile.js');
        cartDao = new cartDaoFile(config.fileSystem.path)
        break
    case 'firebase':
        const { default: cartDaoFirebase } = await import('./cartDaoFirebase.js')
        cartDao = new cartDaoFirebase()
        break
    case 'mongodb':
        const { default: cartDaoMongoDb } = await import('./cartDaoMongoDb.js')
        cartDao = new cartDaoMongoDb()
        break
    default:
        const { default: cartDaoMemory } = await import('./cartDaoMemory.js')
        cartDao = new cartDaoMemory()
        break
}

export { cartDao }