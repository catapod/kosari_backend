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
  .post('/score/new', ctx => {
    const { username, distance } = ctx.request.body

    if (!username || !distance) {
      ctx.throw(400, 'Username and distance required!')
      return
    }

    const user = ctx.db.get('scores')
      .find({ username })
      .value()

    if (!user) { 
      ctx.db.get('scores')
        .push({ id: shortid.generate(), distance, username })
        .write()
    } else {
      ctx.throw(401, 'User already exists!')
    }
  })
  .post('/score/update', ctx => {
    const { id, distance } = ctx.request.body
    const user = ctx.db.get('scores').find({ id })

    if (user) {
      user
        .assign({ distance })
        .write()
    } else {
      ctx.throw(401, 'User does not exist!')
    }
  })