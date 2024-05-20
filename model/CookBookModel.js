const { Schema, model } = require("mongoose");

//创建Schema实例对象，参数为字段名：字段值类型组成的对象

const menusSchema = new Schema({
  label: String, // 名称
  type: String, // 
  color: String, // 
}, {
  versionKey: false, // 禁用文件内部修订号，即__v属性
})
const CookBook = model("cookBookCollection", menusSchema, "cookBookCollection")
module.exports = CookBook;
