import React from 'react';
// import io from 'socket.io-client'; 
import {List,InputItem, NavBar, Icon,Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,revcMsg,readMsg} from '../../redux/chat.redux.js'
import {getChatId} from '../../util.js';

// const socket =  io('ws://localhost:9093');


@connect(state=>state,//因为还需要用户中的redux的数据，所以获取全部
    {getMsgList,sendMsg,revcMsg,readMsg}
)
class Chat extends React.Component{
    constructor(){
        super()
        this.state = {
            text:'',
            showEmoji:false
        }
    }
    componentDidMount(){
    //    const socket =  io('ws://localhost:9093');  //组件挂载之后触发该函数，所以这里声明的变量其他函数是读取不到的。
        // socket.on('revcmsg',(data)=>{   //这里用箭头函数是因为函数的this指向的是socket
        //     console.log(data);
        //     this.setState({msg:[...this.state.msg,data]}); //模拟一个聊天列表
        // })
        // this.props.getMsgList();
        // this.props.revcMsg();//进入应用revcMsg就开始触发监听
        // console.log(this.props)
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.revcMsg();
        }

        // const to = this.props.match.params.user;
        // // console.log(to)
        // this.props.readMsg(to);

        // //手动派发事件解决emoji宫格表情bug
        // setTimeout(function(){
        //     window.dispatchEvent(new Event('resize'))
        // },0)
    }
    componentWillUnmount(){ //组件被隐藏，移除，路由跳转离开组件时触发
        console.log('unmont')
        const to = this.props.match.params.user;
        // console.log(to)
        this.props.readMsg(to);
    }
    fixCarousel(){
        //手动派发事件解决emoji宫格表情bug
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        // console.log(this.state)
        // socket.emit('sendmsg',{text:this.state.text}) //发送到后端
        const from = this.props.user._id;//当前用户的id
        const to = this.props.match.params.user; //发送用户的id，取url中的值
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:''});
        // console.log(this.props)
        // console.log(msg)
    }
    render(){
        const emoji = '😀 😂 🤣   😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢 😂 🤣 😃 😅 😆 😉 😍 😎 😚 🤑 🤢'
                    .split(' ') //按空格分割
                    .filter(v=>v)//过滤多余的空格，
                    // .filter(v=>v!='')//等同于上面    ，
                    .map((val)=>({text:val}));

        
        // console.log(this.props)
        const userid = this.props.match.params.user;
        const users = this.props.chat.users;
        if(!users[userid]){
            return null;
        }
        const chatid = getChatId(userid,this.props.user._id);
        // console.log(chatid)
        //根据chatid过滤
        const chatmsgs = this.props.chat.chatmsg.filter(val=>{
            return val.chatid == chatid;
        });
       
        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark' 
                    icon={<Icon type='left' />}
                    onLeftClick={()=>{
                        this.props.history.goBack();
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map((val,index)=>{
                    const avatar = require(`../imgs/${users[val.from].avatar}.jpg`)
                    // return <p key={index}>{val.content}</p>
                    return val.from == userid?(//因为聊天列表是遍历所有的表,所以应该把和用户有关的筛选出来
                        <List key={index}>
                            <List.Item
                                thumb={avatar}
                            >
                                {val.content}
                            </List.Item>
                        </List>
                    ):(
                        <List key={index}>
                            <List.Item 
                                extra={<img src={avatar}/>}
                                className='chat-me'
                            >
                                {val.content}
                            </List.Item>
                        </List>
                    )
                })}

               
            
                <div className='stick-footer'>
                    <List>
                        <InputItem
                        placeholder='请输入'
                        val={this.state.text}
                        onChange={(val)=>{this.setState({text:val})}}
                        value={this.state.text}
                        extra={
                            <div>
                                <span style={{marginRight:10}} onClick={()=>{
                                    this.setState({showEmoji:!this.state.showEmoji});
                                    this.fixCarousel();
                                    }}>😀</span>
                                <span onClick={()=>this.handleSubmit()}>发送</span>
                            </div>
                        }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?(<Grid 
                        data={emoji}
                        columnNum={9} //每行显示几个
                        carouselMaxRow={3} //最多多少列,只有再轮播图中才会有效
                        isCarousel={true}
                        onClick={elem=>{
                            this.setState({
                                text:this.state.text+elem.text
                            })
                        }}
                    />):null}
                </div>
            </div>
            
        )
    }
}

export default Chat;
