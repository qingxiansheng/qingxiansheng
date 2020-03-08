const express = require("express")
const router = express.Router();

// 引入需要的schema 的表名
var { User, Code, Dataemp, Empinfo } = require('./utils/schema')
// 引入云之讯发送短信的设置文件
var { getResult } = require("./config");
// var {sendCode} = require("./aly")
var { createToken } = require("./utils/token");
router.get('/index', (req, res) => {
    res.send('这是react项目后端服务器')
})
// 随机生成的验证码
function getCode() {
    return 1000 + Math.floor((10000 - 1000) * Math.random())
}

// 云之讯发送验证码
router.post("/yum/sendSms", (req, res) => {
    var { mobile } = req.body;
    // console.log(req.body)
    const code = getCode();
    if (!mobile) {
        res.json({
            code: 200,
            msg: "请先输入手机号"
        })
    } else {
        User.findOne({ mobile: req.body.mobile }).then(result => {
            if (result) {
                User.insertMany(req.body)
            }
        })
    }


    // 传入参数
    getResult(code, mobile).then(response => {
        console.log(response.data);
        console.log(response.data.code);
        if (response.data.code == "000000") {
            // 插入数据库 
            Code.insertMany({
                mobile,
                code,
                time: new Date()
            }).then(result => {
                res.json({
                    code: 200,
                    msg: "验证码发送成功",
                    param: code,
                    type: 1,
                    result
                })
            })
        } else {
            res.json({
                code: 200,
                msg: "验证码发送失败",
                type: 0
            })
        }

    }).catch(err => {
        res.json({
            code: 200,
            msg: "服务器错误",
            type: 0
        })
    })
})
// 云之讯验证验证码
router.post("/checkCode", (req, res) => {
    var {
        mobile,
        code
    } = req.body;
    // console.log(req.body)
    // User.findOne({mobile:})
    Code.findOne({
        mobile,
        code
    }).then(result => {
        if (result) {
            var time = new Date();

            if (time - result.time < 60 * 100000000000) {
                // if (time - result.time < 60 * 1000) {
                User.findOne({ mobile: req.body.mobile }).then(result1 => {

                    if (!result1) {
                        console.log(result1)
                        User.insertMany({ mobile: req.body.mobile, password: req.body.password, username: req.body.username })
                    }
                })
                var token = createToken(mobile);
                res.json({
                    code: 200,
                    msg: "验证码有效",
                    type: 1,
                    token
                })
            } else {
                res.json({
                    code: 200,
                    msg: "验证码过期",
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "验证码错误",
                type: 0
            })
        }
    })
})
// 登陆
router.post('/login', (req, res) => {
    var { mobile, password } = req.body
    // console.log(req.body)
    User.findOne({ mobile: req.body.mobile }).then(result => {
        // console.log(result)
        if (result) {
            if (req.body.password == result.password) {
                res.json({
                    code: 200,
                    type: 1,
                    msg: '登陆成功',
                    result
                })
            } else {
                res.json({
                    code: 200,
                    type: 0,
                    msg: '手机号或者密码不正确，请重新输入',
                    result,
                })
            }
        } else {
            res.json({
                code: 200,
                type: 0,
                msg: '手机号不存在，请注册',
                result,
            })
        }
    })
})
// 管理员过去员工信息
router.get('/getemp', (req, res) => {
    Dataemp.find().sort({ key: 1 }).then(result => {
        res.json({
            code: 200,
            mgs: "管理员获取员工信息",
            type: 1,
            result,
        })
    })
})

// 管理员删除某个员工信息
router.post('/deleteOne', (req, res) => {
    var body = req.body
    console.log(body)
    var { key, mobile } = body

    Dataemp.findOneAndRemove({key:body.params.key}).then(result => {
        Dataemp.find().sort({ uid: 1 }).then(result => {
            res.json({
                code: 200,
                msg: '删除某一条员工信息',
                type: 1,
                result
            })
        })
    })

})
// 管理员修改某个员工信息
router.post('/changeOne', (req, res) => {
    var body = req.body
    console.log(body.params.key)

    var { mobile, name, key } = body
    Dataemp.updateOne({ key: body.params.key }, { name: body.params.name, mobile: body.params.mobile }).then(result => {
        console.log(result)
        Dataemp.find().sort({ key: 1 }).then(result => {

            res.json({
                code: 200,
                type: 1,
                msg: '管理员修改某个员工信息',
                result,
            })
        })
    })
})
// 管理员添加一个新员工
router.post('/addOneEmp', (req, res) => {
    var body = req.body
    console.log(body)
    var uid = body.params.uid
    var name = body.params.name
    var mobile = body.params.mobile
    var key = body.params.key
    console.log(key)
    console.log(uid)
    Dataemp.insertMany([{ uid, name, mobile, key: key }]).then(result => {
        Dataemp.find().sort({ uid: 1 }).then(result => {
            // console.log(result)
            res.json({
                code: 200,
                type: 1,
                msg: '管理员添加员工信息',
                result,
            })
        })
    })
})
module.exports = router