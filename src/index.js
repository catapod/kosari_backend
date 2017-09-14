import Koa from 'koa'
import koaBody from 'koa-body'
import { router } from './api'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

const adapter = new FileSync(path.resolve(__dirname, 'data/db.json'))
const db = low(adapter)

db.defaults({ scores: []})
  .write()

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.context.db = db

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
