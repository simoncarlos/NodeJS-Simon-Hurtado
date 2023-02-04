import Router from 'koa-router'
import chatsController from '../controllers/chatsController.js'

const router = new Router({
    prefix: "api/chats"
})

router.get("/", chatsController.getAllController)
router.post("/", chatsController.postController)

const routes = router.routes()

export default routes