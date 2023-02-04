import { daoProducts } from "../persistence/daos/daoProducts.js"

const productsApi = {
    getAll: async () =>{
        return await daoProducts.readFile() 
    },
    add: async product => {
        await daoProducts.saveObject(product)
        return await daoProducts.readFile()
    }
}

export default productsApi