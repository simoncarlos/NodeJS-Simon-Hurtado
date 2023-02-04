import chatsApi from "../apis/chatApi.js"

const chatsController = {
    getAllController: ctx =>{
        ctx.body = chatsApi.getAll()
    },
    postController: ctx =>{
        const mensajeAgregado = chatsApi.add(ctx.request.body)
        if (mensajeAgregado) {
            ctx.response.status = 201
            ctx.body = mensajeAgregado
        }else {
            ctx.response.status = 400
            ctx.body = {
                status: 'BAD REQUEST',
                message: 'invalid data',
            }
        }
    }
}

export default chatsController