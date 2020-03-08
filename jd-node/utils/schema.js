// Schema主要用于定义MongoDB中集合Collection里文档document的结构
// Schema 表结构的定义 定义文档的结构和属性  
// 每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力
// {username:String,age:Number}

// String      字符串
// Number      数字    
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID    
// Array       数组
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var user_schema = new Schema({
    username: String,
    password: String,
    mobile: Number,
    time: Date,
})
// Model 模型  
// Model是由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为
// Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作
// model是由schema生成的模型，可以对数据库的操作
exports.User = mongoose.model('user', user_schema);

// 验证码 
var code_schema = new Schema({
    mobile: Number,
    code: Number,
    time: Date,
})

exports.Code = mongoose.model('code', code_schema);


// 员工信息表
var dataemp_schema = new Schema({
    uid: String,
    name: String,
    gender: String,
    age: Number,
    mobile: Number,
    key: String,
    address: String,
    inductionDate: String,//入职日期
    department: String,//部门
    position: String,//职位
    shouldworkday: Number,//应工作天数
    jiaday: Number,//请假天数
    workday: Number,//实际工作天数
    jbslary: Number, //基本工资
    qqslary: Number,// 全勤工资
    jxslary: Number,// 绩效工资
    slary: Number,// 实际工资
    tags: Array,//
    time: Date,
    dataemp: Array,
    type: String,//1，2，3，代表不同的权限，1管理员，2，普通员工，

})

exports.Dataemp = mongoose.model('dataemp', dataemp_schema);
// 表名：员工信息   empinfo
var empinfo_schema = new Schema({
    uid: String,
    name: String,
    gender: String,
    age: Number,
    key: String,
    mobile: Number,
    address: String,
    inductionDate: String,
    department: String,
    position: String,
    time: Date,

})

exports.Empinfo = mongoose.model('empinfo', empinfo_schema);

// const b = [
//     {
//         uid: '00000',
//         key: '1',
//         name: "管理员",
//         mobile: 15527205595,
//         department: '无',
//         yfpayout: 0,
//         salepayout: 0,
//         hqpayout: 0,
//         zjbpayout: 0,
//         qtpayout: 0,
//         zzpayout: 0,
//     },
//     {
//         uid: '00001',
//         key: '2',
//         name: "秦先生",
//         mobile: 15521234590,
//         department: '总经办',
//         yfpayout: 0,
//         salepayout: 0,
//         hqpayout: 0,
//         zjbpayout: 1000,
//         qtpayout: 0,
//         zzpayout: 0,
//     },
//     {

//         uid: '00002',
//         key: '3',
//         name: "员工a",
//         mobile: 15521234561,
//         department: '技术部',
//         yfpayout: 50000,
//         salepayout: 0,
//         hqpayout: 0,
//         zjbpayout: 0,
//         qtpayout: 0,
//         zzpayout: 0,
//     },
//     {

//         uid: '00003',
//         key: '4',
//         name: "员工b",
//         mobile: 15521234562,
//         department: '技术部',
//         yfpayout: 1000,
//         salepayout: 0,
//         hqpayout: 0,
//         zjbpayout: 0,
//         qtpayout: 0,
//         zzpayout: 0,

//     },
//     {
//         uid: '00004',
//         key: '5',
//         name: "员工d",
//         mobile: 15521234563,
//         department: '行政部',
//         yfpayout: 0,
//         salepayout: 0,
//         hqpayout: 0,
//         zjbpayout: 0,
//         qtpayout: 0,
//         zzpayout: 50000,

//     },
//     {
//         uid: '00005',
//         key: '6',
//         name: "员工e",
//         mobile: 15521234564,
//         department: '销售部',
//         yfpayout: 0,
//         salepayout: 1000,
//         hqpayout: 0,
//         zjbpayout: 0,
//         qtpayout: 0,
//         zzpayout: 0,
//     },
//     {
//         uid: '00006',
//         key: '7',
//         name: "员工f",
//         mobile: 15521234565,
//         department: '后勤',
//         yfpayout: 0,
//         salepayout: 1000,
//         hqpayout: 0,
//         zzpayout: 0,
//         zjbpayout: 8000,
//         qtpayout: 0,
//     },
// ]


// yfpayout:Number,//研发支出
// salepayout:Number,//销售支出
// hqpayout:Number,//后勤支出
    // zzpayout: Number,//行政支出
// zjbpayout:Number,//总经办支出
// qtpayout:Number,//其他支出

// yfpayin:Number,//研发收入
// salepayin:Number,
// qtpayin:Number,