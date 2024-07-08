var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { getToken } = require('../jwtConfig');
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


module.exports = router;
