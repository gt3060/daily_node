// jwtConfig.js
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'miyao';
const expiresIn = '1h';
let userInfo = {};
module.exports.jwtConfigParams = {
  jwtSecretKey, // jwt加密的密钥
  expiresIn: '1h' // token过期时间
}

// 获取token，返回就是token字符串
module.exports.getToken = (userInfoObj) => {
  /**
   * 生成token
   * {Object} token内部参数
   * {String} token密钥
   * {Object} 配置参数
   */
  return jwt.sign(userInfoObj, jwtSecretKey, {
    expiresIn: expiresIn
  })
}

const excludeUrl = ['/userMenu/login', '/userMenu/register']; // 不参与校验的请求路径
// 校验token
module.exports.vertifyToken = (req, res, next) => {
  if (excludeUrl.includes(req.path)) {
    next();
    return;
  }
  // authorization参数名为前后端商量确定，总之放到请求头中，值得注意的是，无论前端如何设置，此字段接收都是小写的
  const token = req.headers.authorization;
  if (!token) {
    res.status(402).json({
      error: 'token不存在'
    })
  }
  try {
    // 这里返回的userInfo包含生成token时候的传参，以及生成token的时间和到期时间
    // 例如：{ name: 'admin', pwd: '123456', iat: 1720432081, exp: 1720435681 }
    userInfo = jwt.verify(token, jwtSecretKey);
    next();
  } catch (error) {
    res.status(402).json({
      error: 'token失效'
    })
  }
}

// 获取token中的参数
module.exports.getTokenParams = () => {
  return userInfo;
}