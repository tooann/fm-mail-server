const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'hello';
})

app.listen(3000, () => {
  console.log('   Server running at:\n' + 
  '   - Local:   http://localhost:3000/\n' +
  '   - Network: http://192.168.8.118:3000/')
})