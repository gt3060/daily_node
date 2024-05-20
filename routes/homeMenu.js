var express = require('express');
var router = express.Router();
// const { HomeMenus } = require('../model/homeMenuModel');
const HomeMenus = require('../model/HomeMenuModel');


// 获取list接口
router.post('/list', async (req, res, next) => {
  const list = await HomeMenus.find().lean();
  res.send({
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

// 获取单个信息
router.get('/get', async (req, res, next) => {
  // 使用findOne返回objct,使用find返回一个数组
  // findOne({}) === find({}).limit(1)
  // 若_id为数据库自动生成，则请求需要用ObjectId包裹
  const list = await HomeMenus.findOne({ _id: ObjectId(req.query._id) });
  res.send({
    code: 200,
    msg: '请求成功',
    data: list
  })
});

// 添加单个信息
router.post('/add', async (req, res, next) => {
  const list = await HomeMenus.create({ ...req.query });
  res.send({
    code: 200,
    msg: '操作成功',
    data: list
  })
});

module.exports = router;
