import config from '../../../src/config.js'

let productDao

// process.env.PERS

switch ( "json" ) {
    case 'json':
        const { default: productDaoFile } = await import('./productDaoFile.js');
        productDao = new productDaoFile(config.fileSystem.path)
        break
    default:
        console.log("entro al default")
        //const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        //personasDao = new PersonasDaoMem()
        break
}

export { productDao }