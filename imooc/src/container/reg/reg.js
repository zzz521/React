import React from 'react';
import Logo from '../../component/logo/logo.js' 
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import HocForm from '../../component/HOCForm/hocform.js'


@connect(
    state=>state.user,
    {register}
)
@HocForm
class Reg extends React.Component{
    constructor(){
        super()
        // this.state={
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:'niuren'
        // }
        this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount(){
        this.props.handleChange('type','niuren')
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
        
    // }
    handleRegister(){
        this.props.register(this.props.state);
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                 <Logo></Logo>
                <WingBlank> 
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={val=>this.props.handleChange('user',val)}>用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type='password' onChange={val=>this.props.handleChange('pwd',val)}>密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type='password' onChange={val=>this.props.handleChange('repeatpwd',val)}>确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        {/* <input onChange={(val,key)=>console.log(val)}/>这种原始标签不能使用直接获取val的方法 */}
                        <RadioItem checked={this.props.state.type=='niuren'}  onChange={val=>this.props.handleChange('type','niuren')}>牛人</RadioItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem checked={this.props.state.type=='boss'}  onChange={val=>this.props.handleChange('type','boss')}>boss</RadioItem>
                    </List>
                  
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                  
                </WingBlank>
            </div>
    )
    }
}

export default Reg;