import config, { TYPE_PERS } from '../../../src/config.js'

let cartDao

switch ( TYPE_PERS ) {
    case 'json':
        const { default: CartDaoFile } = await import('./cartDaoFile.js');
        cartDao = new CartDaoFile(config.fileSystem.path)
        break
    case 'firebase':
        const { default: CartDaoFirebase } = await import('./cartDaoFirebase.js')
        cartDao = new CartDaoFirebase()
        break
    case 'mongodb':
        const { default: CartDaoMongoDb } = await import('./cartDaoMongoDb.js')
        cartDao = new CartDaoMongoDb()
        break
    default:
        const { default: CartDaoMemory } = await import('./cartDaoMemory.js')
        cartDao = new CartDaoMemory()
        break
}

export { cartDao }