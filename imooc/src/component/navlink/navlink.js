import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

@withRouter
@connect(state=>state.chat)
class NavLinkBar extends React.Component{
    static propTypes ={
        data:PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)//不等于true的返回
        // console.log(navList);
        const {pathname} = this.props.location;
        return (
            <TabBar>
                {navList.map((val,index)=>(  //这里用()包裹住一个TabBar.item的标签,一行语句可以省略return
                    <TabBar.Item
                        badge = {val.path == '/msg'?this.props.unread:0}
                        key = {index}
                        title = {val.text}
                        icon = {{uri:require(`./img/${val.icon}.png`)}}
                        selectedIcon = {{uri:require(`./img/${val.icon}-active.png`)}} //选中时候的图标
                        selected = {pathname === val.path} //当前路径下是否选中
                        onPress = {()=>{
                            this.props.history.push(val.path) //点击跳转
                        }}
                    ></TabBar.Item>
            ))  
                }
            </TabBar>
        )
    }
}

export default NavLinkBar;