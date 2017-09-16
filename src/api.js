import Router from 'koa-router'
import shortid from 'shortid'
export const router = new Router({ prefix: '/api' })

router
  .get('/topten', ctx => {
    ctx.status = 200

    const scores = ctx.db.get('scores')
      .sortBy('distance')
      .reverse()
      .take(10)
      .value()

    ctx.body = scores
  })
  .post('/score', ctx => {
    const { username, distance } = ctx.request.body

    if (!username || !distance) {
      ctx.throw(400, 'Username and distance required!')
      return
    }

    ctx.db.get('scores')
      .push({ id: shortid.generate(), distance, username })
      .write()
  })