const { Schema, model } = require("mongoose");

//创建Schema实例对象，参数为字段名：字段值类型组成的对象

const menusSchema = new Schema({
  id: String,
  name: String,
  role: String,
  pwd: String
}, {
  versionKey: false, // 禁用文件内部修订号，即__v属性
})

// model 是我们构造Document的类
/*
/model接收两个参数：
/第一个参数为对应集合名称的单数形式（mongoose会自动将其变为复数并匹配）
/第二个参数为Schema的名称
*/
const Menus = model("UserCollection", menusSchema, "userCollection")
//导出模型
module.exports = Menus;
