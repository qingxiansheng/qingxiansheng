
// express构建服务器 主机名，端口，协议
const express = require('express')
const app = express()
const hostname = "0.0.0.0"
// const port = 1910
const port = 1911
// const http = require('http')
// const server = http.createServer(app)


var http = require("http");
var https = require('https');
var fs = require("fs");
// 第一步：https
var privateKey  = fs.readFileSync('./cert/https.key', 'utf8');  
var certificate = fs.readFileSync('./cert/https.pem', 'utf8');  
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials,app);   // https
var httpServer = http.createServer(app);   // http
// 引入数据连接connec
const connection=require('./utils/connect')

httpsServer.listen(port, hostname, () => {
    console.log(`my server is running aat http://${hostname}:${port}`)
})

// cors解决跨域 所有的接口无条件访问
var cors=require('cors')
app.use(cors())

app.use(express.json());  // 获取 POST 请求的 FormData  $.POST 
app.use(express.urlencoded({ extended: false }));  // 表单 Form  action  name   req.body 

app.get('/index', (req, res) => {
    res.send('这是前后端分离的node+express后端服务器')
})





// 设置别名
const reactRouter=require('./react')
app.use('/react',reactRouter)
  

app.get('/demo', (req, res) => {
    res.json({
        msg: "demo-demo -demo",
        headers: req.headers,
        query: req.query,
        params: req.params,
        path: req.path,
        url: req.url,
        body: req.body
    })
})