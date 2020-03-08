// node 连接mongoDB数据库  mongoose 
// mongoose需要下载
const mongoose = require('mongoose')

// 连接数据库的主机名，端口，数据库名，用户名，用户密码

// const hostname = "0.0.0.0";
const hostname = "0.0.0.0";
const port = 27017;
const dbName = "wh1910";
const user = "?";
const password = "?";

const CONN_DB_STR = `mongodb://${hostname}:${port}/${dbName}`;

mongoose.connect(CONN_DB_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)

    } else {
        console.log('数据库连接成功')
    }
})
const connection = mongoose.connection
// 数据库连接状态
// 连接成功
connection.on("connected", () => {
    console.log('Mongoose connection open to ' + CONN_DB_STR);
})

// 数据库开启
connection.on("open", () => {
    console.log('mongoose open')
});

// 链接异常
connection.on('error', err => {
    console.log('Mongoose connection error: ' + err);
    // res.json()
})

// 断开链接
connection.on('disconnected', () => {
    console.log('Mongoose connection fail 链接失败')
})

module.exports = connection



