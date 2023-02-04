import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'

import productsRouter from "./routers/routerProducts.js"
import chatsRouter from "./routers/routerChats.js"

const app = new Koa()

app.use(cors())
app.use(koaBody())

app.use(productsRouter)
app.use(chatsRouter)

export default server
