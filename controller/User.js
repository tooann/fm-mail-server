const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

router.post('/register', async (ctx) => {
  const User = mongoose.model('User');
  await User.findOne({userName: ctx.request.body.userName}).exec().then(async (result) => {
    if (!result) {
      let newUser  = new User(ctx.request.body);
      await newUser.save().then(() => {
        ctx.body = {
          code: 200,
          message: '注册成功'
        }
      }).catch(() => {
        ctx.body = {
          code: 500,
          message: '注册失败'
        }
      })
    } else {
      ctx.body = {
        code: 500,
        message: '用户名已存在'
      }
    }
  })
})

router.post('/login', async (ctx) => {
  const User = mongoose.model('User');
  let loginUser = ctx.request.body;
  let userName = loginUser.userName;
  let password = loginUser.password;
  await User.findOne({userName: userName}).exec().then(async (result) => {
    if (result) {
      let newUser = new User();
      await newUser.verifyPassword(password, result.password).then((isMatch) => {
        if (isMatch) {
          ctx.body = {
            code: 200,
            message: '登录成功',
            userName: result.userName,
            userId: result._id
          }
        } else {
          ctx.body = {
            code: 201,
            message: '密码错误'
          }
        }
      })
    } else {
      ctx.body = {
        code: 201,
        message: '用户名不存在'
      }
    }
  })
})

module.exports = router;