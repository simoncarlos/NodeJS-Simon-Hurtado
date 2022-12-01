import config, { TYPE_PERS } from '../../../src/config.js'

let productDao

switch ( TYPE_PERS ) {
    case 'json':
        const { default: ProductDaoFile } = await import('./productDaoFile.js');
        productDao = new ProductDaoFile(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductDaoFirebase } = await import('./productDaoFirebase.js')
        productDao = new ProductDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductDaoMongoDb } = await import('./productDaoMongoDb.js')
        productDao = new ProductDaoMongoDb()
        break
    default:
        const { default: ProductDaoMemory } = await import('./productDaoMemory.js')
        productDao = new ProductDaoMemory()
        break
}

export { productDao }