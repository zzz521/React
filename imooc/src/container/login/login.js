import React from 'react';
import Logoo from '../../component/logo/logo.js' //引用default暴露出来的变量名字可以随便写
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'//wingblank两翼留白
import {Route,Switch,Redirect,BrowserRouter} from 'react-router-dom';
import {login} from '../../redux/user.redux.js'
import {connect} from 'react-redux';
import HocForm from '../../component/HOCForm/hocform.js'
@connect(
    state=>state.user,
    {login}
)
@HocForm
class Login extends React.Component{
    constructor(props){
        super(props);
        // this.state={
        //     user:'',
        //     pwd:'',
        // }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    register(){
        this.props.history.push('/reg'); 
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return (
            <div>
                 {(this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null}
                 <Logoo></Logoo>
                {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                <WingBlank> 
                    <List>
                        <InputItem onChange={val=>this.props.handleChange('user',val)}>用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={val=>this.props.handleChange('pwd',val)} type='password'>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handleLogin}>登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
    )
    }
}

export default Login;