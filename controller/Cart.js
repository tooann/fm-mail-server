const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

router.post('/addCart', async (ctx) => {
  const Cart = mongoose.model('Cart');
  let cart = new Cart(ctx.request.body);
  await cart.save().then((res) => {
    ctx.body = res;
  })
})

router.get('/getCartList', async (ctx) => {
  const Cart = mongoose.model('Cart');
  await Cart.find({userId: ctx.query.userId}).populate('productId').exec().then((res) => {
    ctx.body = res;
  })
})

module.exports = router;