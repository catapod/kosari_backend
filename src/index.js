import Koa from 'koa'
import koaBody from 'koa-body'
import { router } from './routes'

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
