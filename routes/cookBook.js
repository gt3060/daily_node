var express = require('express');
const CookBook = require('../model/CookBookModel');

const app = express();
//导入body-parser模块;
const bodyParser = require('body-parser');
//根据模块创建中间件函数;
let jsonParser = bodyParser.json(); //处理JSON格式请求体的中间件函数
let urlParser = bodyParser.urlencoded({ extended: false }); //处理querystring格式请求体的中间件函数



// 获取list接口
app.post('/list', jsonParser, async (request, response) => {
  const list = await CookBook.find({ type: request.body.type }).lean();
  response.send({
    code: 200,
    msg: '请求成功',
    data: list.map(item => {
      const id = item._id;
      delete item._id;
      return {
        ...item,
        id,
      }
    })
  })
});

// 添加单个信息
app.post('/add', jsonParser, async (request, response) => {
  const list = await CookBook.create({ ...request.body });
  response.send({
    code: 200,
    msg: '操作成功',
  })
});
// 删除单个信息
app.post('/delete', jsonParser, async (request, response) => {
  await CookBook.deleteOne({ _id: request.body.id });
  response.send({
    code: 200,
    msg: '操作成功',
  })
});

module.exports = app;
