const Koa = require('koa');
const app = new Koa();

// 处理跨域
const cors = require('koa2-cors');
app.use(cors({
  origin: (ctx) => {
    return 'http://192.168.8.118:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 接受post请求特殊处理
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 加载路由
const Router = require('koa-router');
let user = require('./controller/User.js');
let product = require('./controller/Product.js');
let type = require('./controller/Type.js');
let cart = require('./controller/Cart.js');
let router = new Router();
router.use('/user', user.routes());
router.use('/product', product.routes());
router.use('/type', type.routes());
router.use('/cart', cart.routes());

app.use(router.routes());
app.use(router.allowedMethods());


// 链接数据库，初始化模型
const { connect, initSchemas } = require('./init.js');
(async () => {
  await connect();
  initSchemas();
})();


app.use(async ctx => {
  ctx.body = 'hello koa';
})

app.listen(3000, () => {
  console.log('   Server running at:\n' + 
  '   - Local: \u001b[38;5;6m http://localhost:3000/ \u001b[0m \n' +
  '   - Network: \u001b[38;5;6m http://192.168.8.118:3000/ \u001b[0m')
})