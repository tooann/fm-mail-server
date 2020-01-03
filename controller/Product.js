const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertProduct', async (ctx) => {
  fs.readFile('./data/product.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let count = 0;
    const Product = mongoose.model('Product');
    data.map((value, index) => {
      let product = new Product(value);
      product.type = Math.floor(Math.random() * 8) + 1;
      product.save().then(() => {
        count++;
      }).catch(() => {
      })
    })
  })
  ctx.body = '导入数据';
})

router.get('/getProducts', async (ctx) => {
  const Product = mongoose.model('Product');
  await Product.find({ type: ctx.query.typeId }).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res => {
    ctx.body = res;
  })
})

router.get('/getDetail', async (ctx) => {
  const Product = mongoose.model('Product');
  await Product.findOne({_id: ctx.query.id}).exec().then((res) => {
    ctx.body = res;
  })
})

module.exports = router;