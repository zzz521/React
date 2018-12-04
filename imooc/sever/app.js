//入口文件
var express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const model = require('./model');
const Chat = model.getModel('chat');

// Chat.remove({},function(e,d){});//清空所有聊天信息

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',function(socket){ //建立连接后执行的函数
    console.log('user logining')   //io是全局的请求，socket是当前的请求。
    socket.on('sendmsg',function(data){  //当前的sc请求，如果接收到则开始执行回调函数
        // console.log(data)
        // io.emit('revcmsg',data); //将data发送到全局
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');//将两个用户的id结合成一起，查询聊天记录的时候只要查到一个id
        // 就可以查到两个人的聊天记录，减少同时查询from和to的麻烦
        // console.log(chatid);
        
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('revcmsg',Object.assign({},doc._doc));
            // console.log(doc._doc)
        })
        
    })
})


app.use(cookieParser());//解析cookie
app.use(bodyParser.json());// 解析post传过来的json 
app.use('/user',userRouter);//开启一个中间件 第一个参数为前缀.子路由由userRouter定义



server.listen(9093,function(){   //为了使用socket.io的写法，正常app.listen
    console.log('Node is starting.')
})
// mongoose.connection.on('connected',function(){
//     console.log('seccuss')
// })
// const User = mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }))
//新增数据
// User.create({
//     user:'wangwu',
//     age:22
// },function(err,doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })

// User.remove({user:'lisi'},function(err,doc){
//     console.log(doc)
// })

// User.update({'user':'lisi'},{'$set':{age:22}},function(err,doc){ //这里第一个参数的属性名可以加引号，也可以不加
//     console.log('update seccuss')
// })


//连接mongo

// app.get('/',function(req,res){
//     res.send('<h1>HELL11O WORLD</h1>');
// })
// app.get('/data',function(req,res){
//     User.findOne({},function(err,doc){  //第一个参数是查找的条件，如果想全部显示，对象为空
//         res.json(doc)
//     })
//     // res.json({name:'zs',type:'12'});
// })
