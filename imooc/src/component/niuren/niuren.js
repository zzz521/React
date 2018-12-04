import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux.js'
import UserCard from '../usercard/usercard.js'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        this.props.getUserList('boss');
    }
    render(){
        // console.log(this.props.userList)
        return <UserCard userList={this.props.userList}></UserCard>
    }
}

export default Boss;