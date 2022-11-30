import config from '../../../src/config.js'

let productDao

// process.env.PERS

switch ( "firebase" ) {
    case 'json':
        const { default: productDaoFile } = await import('./productDaoFile.js');
        productDao = new productDaoFile(config.fileSystem.path)
        break
    case 'firebase':
        const { default: productDaoFirebase } = await import('./productDaoFirebase.js')
        productDao = new productDaoFirebase()
        break
    case 'mongodb':
        const { default: productDaoMongoDb } = await import('./productDaoMongoDb.js')
        productDao = new productDaoMongoDb()
        break
    default:
        const { default: productDaoMemory } = await import('./productDaoMemory.js')
        productDao = new productDaoMemory()
        break
}

export { productDao }