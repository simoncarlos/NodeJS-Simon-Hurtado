import config from '../../../src/config.js'

let cartDao

// process.env.PERS

switch ( "json" ) {
    case 'json':
        const { default: cartDaoFile } = await import('./cartDaoFile.js');
        cartDao = new cartDaoFile(config.fileSystem.path)
        break
    default:
        console.log("entro al default")
        //const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        //personasDao = new PersonasDaoMem()
        break
}

export { cartDao }