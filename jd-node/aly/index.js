const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4FgzQCGEHg2VJfySrcq3',
  accessKeySecret: 'PqJgedxTMGFxbqGu8VBokes31dYvrD',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

// 调用 阿里云 后台发送验证码到手机 
exports.sendCode = function(mobile,code){
    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers":mobile,
        "SignName":"小七之家",
        "TemplateCode":'SMS_181555608',
        "TemplateParam":'{code:'+code+'}'   // 最大bug
      }
      
      var requestOption = {
        method: 'POST'
      };

      return client.request('SendSms',params,requestOption)
}
