import Router from 'koa-router'
import productsController from '../controllers/productsController.js'

const router = new Router({
    prefix: "api/products"
})

router.get("/", productsController.getAllController)
router.post("/", productsController.postController)

const routes = router.routes()

export default routes