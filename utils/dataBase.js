const mongoose = require("mongoose");

//定义数据库名
const dbName = "daily";
//定义数据库路径端口
const path = "localhost:27017";

const dbUrl = `mongodb://${path}/${dbName}`;

//连接数据库
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//连接成功时
mongoose.connection.once("open", () => {
    console.log(dbName + "数据库连接成功，端口27017");
});
//连接失败时
mongoose.connection.once("error", () => {
    console.log(dbName + "数据库连接失败！");
});
