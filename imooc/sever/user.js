//这是一个user的中间件
const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const utils = require('utility');  //md5 密码加密
const _filter = {'pwd':0,'__v':0};  //查询过滤条件

Router.get('/list',function(req,res){
    // User.remove({avatar:'head0'},function(err,doc){
    //     //清除所有数据
    // })  
    const {type} = req.query; //获取get参数
    User.find({type:type},function(err,doc){
        return res.json({code:0,data:doc});
    })
})

Router.post('/login',function(req,res){
    // console.log(req.body)
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'请输入正确的用户名和密码'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',function(req,res){ //接收值
    // console.log(req.body);  //req是获取前台的请求发送过来的值
    const {user,pwd,type} = req.body;  //req.body是传过来的所有数据
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        // User.create({user,pwd:md5Pwd(pwd),type},function(err,doc){ //这里将user:user省略成user,
        //     if(err){
        //         return res.json({code:1,msg:'服务端出错'})
        //     }
        //     return res.json({code:0})
        // })  
        

        //为了保存cookie的写法
        const userModel = new User({user,type,pwd:md5Pwd(pwd)});
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:1,msg:'服务端出错'})
            }
            const {user,type,_id} = doc;
            res.cookie('userid',doc._id);
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})

Router.get('/info',function(req,res){
    //获取cookie
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1})  //这里如果没有cookie，info接受code的值是1，会自动跳转到登陆页
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res .json({code:1,msg:'服务端出错'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

Router.post('/update',function(req,res){
    const userid = req.cookies.userid;
    if(!userid){
        return json.dumps({code:1})  
    }
    const body = req.body;//前端传过来的数据
    User.findByIdAndUpdate(userid,body,function(err,doc){   //这里传进去的值已经对数据库进行了修改
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)   //这个data是给前端返回的data，存储在state中，所以不需要密码
        return res.json({code:0,data:data})
    }) //查找并且修改
})


Router.get('/getmsglist',function(req,res){
    const userid = req.cookies.userid;//获取用户信息
    //获取用户的头像名称等信息
    let users = {}
    User.find({},function(e,userdoc){
        userdoc.forEach(val=>{
            users[val._id] = {name:val.user,avatar:val.avatar}
        })


        //后查询
        Chat.find({'$or':[{from:userid},{to:userid}]},function(err,doc){ //多条件查询,跟当前用户有关的聊天记录
            if(!err){
                res.json({code:0,msgs:doc,users:users})
            }else{
                console.log(11)
            }
        })
    })
  
})

Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userid;
    const {from} = req.body;
    // console.log(userid,from);
    Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},function(err,doc){
        if(!err){
            console.log(doc.nModified)
            return res.json({code:0,num:doc.nModified})
        }else{
            return res.json({code:1,msg:'修改失败'})
        }
    })

})

function md5Pwd(pwd){
    const salt = 'Iam_vary_good!THIS_IS_SALT~~!!@#..123';
    return utils.md5(utils.md5(pwd+salt)); //双层md5加上加盐加密
}

module.exports = Router;