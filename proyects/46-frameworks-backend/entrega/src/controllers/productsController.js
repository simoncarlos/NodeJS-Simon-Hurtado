import productsApi from "../apis/productApi.js"

const productsController = {
    getAllController: ctx =>{
        ctx.body = productsApi.getAll()
    },
    postController: ctx =>{
        const productoAgregado = productsApi.add(ctx.request.body)
        if (productoAgregado) {
            ctx.response.status = 201
            ctx.body = productoAgregado
        }else {
            ctx.response.status = 400
            ctx.body = {
                status: 'BAD REQUEST',
                message: 'invalid data',
            }
        }
    }
}

export default productsController