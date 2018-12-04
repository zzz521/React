//页面路由跳转组件

import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user.redux.js'
import {connect} from 'react-redux'

@withRouter  //获取路由组件的方法
@connect(
    state=>state.user,
    // null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login','/reg'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){ //pathname在publicList中首次出现的位置
            console.log(2)
            return null;  //这里return null之后下面的代码就不会执行了 类似于这个ifelse中写入下面的验证代码
        }
        //axios返回的是一个promise对象，.then代表当前这次请求返回的所有的值
        axios.get('/user/info')
        .then(res=>{  //res就代表返回的所有值
            if(res.status == 200){
                if(res.data.code == 0){
                    this.props.loadData(res.data.data);   
                }else{     
                    console.log(1)
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null;
    }
}
export default AuthRoute;