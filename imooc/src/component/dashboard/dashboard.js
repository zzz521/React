import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../navlink/navlink.js';
import {Switch,Route,BrowserRouter} from 'react-router-dom';
import Boss from '../boss/boss.js'
import Niuren from '../niuren/niuren.js'
import User from '../user/user.js'
import Msg from '../msg/msg.js'
import {getMsgList,revcMsg} from '../../redux/chat.redux.js'




@connect(
    state=>state,
    {getMsgList,revcMsg}
)
class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.revcMsg();
        } 
    }
    render(){
        const {pathname} = this.props.location
        const user = this.props.user;
        const navList = [
            {
                path:'/boss',
                text:'牛人',//boss查看的是牛人列表
                icon:'list',
                title:'牛人列表',
                component:Boss,
                hide:user.type=='niuren'  //用户类型为牛人时，会隐藏
            },
            {
                path:'/niuren',
                text:'boss',
                icon:'list',
                title:'boss列表',
                component:Niuren,
                hide:user.type=='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        return (
            <div>
                <NavBar mode='dard' className='fixd-header'>{navList.find(v=>v.path==pathname).title}</NavBar>
                {/* <BrowserRouter> */}
                 <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(val=>(
                            <Route path={val.path} component={val.component} key={val.path}></Route>
                        ))}
                    </Switch>
                </div>
                {/* </BrowserRouter> */}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard;
