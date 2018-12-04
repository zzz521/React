//存储数据库的信息
var mongoose = require('mongoose')

const DB_URL = "mongodb://127.0.0.1:27017/user-chat"
mongoose.connect(DB_URL);

const models = {
    user:{ //用户模型
        'user':{type:String,require:true}, //用户字段
        'pwd':{type:String,require:true}, //require表示必须有
        'type':{type:String,require:true},
        //头像
        'avatar':{type:String},
        //个人简介
        'desc':{type:String},
        //职位名
        'title':{type:String},
        //boss还有两个字段
        'company':{type:String},
        'money':{type:String}
    },
    chat:{ //聊天信息表
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},  //发送者
        'to':{type:String,require:true},  //接受者
        'read':{type:Boolean,default:false},//是否已读
        'content':{type:String,require:true,default:''},//默认为空
        'create_time':{type:Number,default:new Date().getTime()}//不需要传值，获取当前时间戳
    }
}

for(let m in models){ //建表
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}