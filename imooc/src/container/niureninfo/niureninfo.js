import React from 'react';
import AvatarSelector from '../../component/avatar-selector/avatar-selector.js'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux.js'


@connect(
    state=>state.user,
    {update}
)
class Niureninfo extends React.Component{
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
                <NavBar mode="dark">牛人设置</NavBar>
                <AvatarSelector selectAvator1={this.selectAvator}></AvatarSelector>
                <InputItem onChange={(val)=>this.handleChange('title',val)}>求职岗位</InputItem>
                <TextareaItem onChange={(val)=>this.handleChange('desc',val)} rows={3} autoHeight title='个人简介'></TextareaItem>
                <Button onClick={()=>this.props.update(this.state)} type='primary'>提交</Button>
            </div>
        )
    }
}

export default Niureninfo;