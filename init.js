const mongoose = require('mongoose');
const db = 'mongodb://localhost/fm_db';

const glob = require('glob');
const path = require('path');

module.exports = {
  connect () {
    // 链接数据库
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
    // 监听数据库连接断开
    mongoose.connection.on('disconnected', () => {
      mongoose.connection(db);
    })
    // 监听数据库链接错误
    mongoose.connection.on('error', err => {
      console.log(err);
      mongoose.connection(db);
    });
    // 连接数据库成功
    mongoose.connection.once('open', () => {
      console.log('mongodb connect success');
    });
  },
  initSchemas () {
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require);
  }
}
