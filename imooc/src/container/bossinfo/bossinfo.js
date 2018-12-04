import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector.js'
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {update}
)
class Bossinfo extends React.Component{
    constructor(){
        super()
        this.state = {
            title:'',
            company:'',
            money:'',
            desc:'',
            avatar:''
        }
        this.selectAvator = this.selectAvator.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    selectAvator(val){
        this.setState({
            avatar:val
        })
    }
    render(){
        const redirect = this.props.redirectTo;
        const path = this.props.location.pathname;
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">资料设置</NavBar>
                <AvatarSelector selectAvator1={this.selectAvator}></AvatarSelector>
                <InputItem onChange={(val)=>this.handleChange('title',val)}>招聘职位</InputItem>
                <InputItem onChange={(val)=>this.handleChange('company',val)}>公司名称</InputItem>
                <InputItem onChange={(val)=>this.handleChange('money',val)}>职位薪资</InputItem>
                <TextareaItem onChange={(val)=>this.handleChange('desc',val)} rows={3} autoHeight title='职位要求'></TextareaItem>
                <Button onClick={()=>this.props.update(this.state)} type='primary'>提交</Button>
            </div>
        )
    }
}


export default Bossinfo;