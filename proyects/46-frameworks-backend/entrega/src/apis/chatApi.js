import { daoChats } from "../persistence/daos/daoChats.js"

const chatsApi = {
    getAll: async () => {
        return await daoChats.readFile()
    },
    add: async message => {
        await daoChats.saveObject(message)
        return await daoChats.readFile()
    }
}

export default chatsApi