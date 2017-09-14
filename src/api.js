import Router from 'koa-router'
export const router = new Router({ prefix: '/api' })

router.post('/score', ctx => {
  const { username, distance } = ctx.request.body
  
  ctx.db.get('scores')
    .push({ id: 1, distance, username })
    .write()
})
