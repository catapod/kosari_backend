import Koa from 'koa'
import koaBody from 'koa-body'
import { router } from './api'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { resolve } from 'path'
import fs from 'fs'

const dbPath = resolve(__dirname, 'data')

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath)
}

const adapter = new FileSync(`${dbPath}/db.json`)
const db = low(adapter)

db.defaults({ scores: []}).write()

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
