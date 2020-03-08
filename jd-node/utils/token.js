var jwt = require("jsonwebtoken");

// Token 带时长限制  
 
const serect = "wuhan1910-daydayup";

// 加密  data 需要加密的字符  
exports.createToken = function(data){
    return jwt.sign(data,serect)
}

// 解密 
const decodeToken = function(token){
    return new Promise(function(resolve,reject){
        jwt.verify(token,serect,function(err,data){
            if(err){
                console.log(err)
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.decodeToken = decodeToken; 

// 获取 token 里面解密的手机号   这不是中间件 next
exports.getMobile = function(req,res,callback){
    var token = req.headers.token;
    if(token){
        decodeToken(token).then(mobile=>{
            callback(mobile)
        }).catch(err=>{
            res.json({
                code:"3000",
                msg:"token 验证失败",
                err,
                type:0,
            })
        })
    }else{
        res.json({
            code:"3000",
            msg:"token不存在,请重新登录",
            type:0
        })
    }
}

