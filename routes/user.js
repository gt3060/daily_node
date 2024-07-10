var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { getToken, getTokenParams } = require('../jwtConfig');
const Menus = require('../model/UserModel');
const { Encrypt, Decrypt } = require("../utils/public");


// 登录
router.post('/login', async (req, res, next) => {
  const userInfo = {
    name: req.body.name,
    pwd: Decrypt(req.body.pwd)
  }
  console.log('登录', userInfo);
  const list = await Menus.find(userInfo);
  console.log('查询成功', list);
  if (list?.length) {
    /**
     * 生成token
     * 1. token内部参数
     * 2. token密钥
     * 3. 配置参数
     */
    const token = getToken({ name: list[0].name, pwd: list[0].pwd });
    res.send({
      code: 200,
      msg: '登录成功',
      data: {
        token
      }
    })
  } else {
    res.send({
      code: 400,
      msg: '用户名或密码错误',
      data: {}
    })
  }
});

router.post('/register', async (req, res, next) => {
  const registerInfo = req.body;
  const params = {
    name: registerInfo.name,
    pwd: Decrypt(registerInfo.pwd),
    confirmPwd: Decrypt(registerInfo.confirmPwd)
  }
  if (params.pwd !== params.confirmPwd) {
    res.send({
      code: 400,
      msg: '两次密码不一致',
      data: {}
    })
    return;
  }
  const list = await Menus.insertMany([{ ...registerInfo }]);
  if (list?.length) {
    res.send({
      code: 200,
      msg: '注册成功',
      data: {}
    })
  } else {
    res.send({
      code: 400,
      msg: '注册失败',
      data: {}
    })
  }
})

router.get('/get', async (req, res, next) => {
  // 使用findOne返回objct,使用find返回一个数组
  // findOne({}) === find({}).limit(1)
  const params = {
    name: getTokenParams()?.name,
    pwd: getTokenParams()?.pwd
  }
  const list = await Menus.findOne(params);
  if (Object.keys(list)?.length) {
    res.send({
      code: 200,
      msg: '成功',
      data: list
    })
  }
})

// 修改密码
router.post('/updatePwd', async (req, res, next) => {
  const params = {
    pwd: Decrypt(req.body.pwd),
    confirmPwd: Decrypt(req.body.confirmPwd),
    newPwd: Decrypt(req.body.newPwd),
    _id: req.body.userId
  }
  if (params.newPwd !== params.confirmPwd) {
    res.send({
      code: 400,
      msg: '两次密码不一致',
      data: {}
    })
    return;
  }
  const oldList = await Menus.findOne({ _id: params._id });
  if (oldList?.pwd !== params.pwd) {
    res.send({
      code: 400,
      msg: '旧密码错误',
      data: {}
    })
    return;
  }
  const list = await Menus.updateOne({ _id: params._id }, { pwd: params.newPwd });
  if (!!list?.modifiedCount && list.modifiedCount > 0) {
    res.send({
      code: 200,
      msg: '修改成功',
      data: {}
    })
  } else {
    res.send({
      code: 400,
      msg: '修改失败',
      data: {}
    })
  }
})

module.exports = router;
