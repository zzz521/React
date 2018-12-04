import React from 'react';
import {Result,List,WhiteSpace,Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import browserCookie from 'browser-cookies'; //用来清除cookie
import {logoutSubmit} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    } 
    logout(){
        const alert = Modal.alert;
        // browserCookie.erase('userid');
        // window.location.href = window.location.href; //强制刷新页面
        alert('注销','确认退出登陆吗',[
            {text:'取消',onPress:()=>console.log('cancel')},
            {text:'确认',onPress:()=>{
                browserCookie.erase('userid');
                this.props.logoutSubmit()   ;
               
            }}
        ])
    }
    render(){
        console.log(this.props)
        return this.props.user?(
            <div>
                <Result
                    img={<img src={require(`../imgs/${this.props.avatar}.jpg`)} style={{width:50}}/>}
                    title={this.props.user}
                    message={this.props.type=='boss'?this.props.company:null}
                />

                <List renderHeader={()=>'简介'}>
                    <List.Item multipleLine>
                    {/* multipleLine在title过长时自动换行的问题 */}
                        {this.props.title}
                        {this.props.desc.split('\n').map(val=><List.Item.Brief key={val}>{val}</List.Item.Brief>)}
                        {this.props.money?<List.Item.Brief>薪资：{this.props.money}</List.Item.Brief>:null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item onClick={this.logout}>退出登陆</List.Item>
                </List>
            </div>
        ):<Redirect to={this.props.redirectTo}/>
        
    }
}

export default User;