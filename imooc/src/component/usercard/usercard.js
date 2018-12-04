import React from 'react';
import PropTypes from 'prop-types';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router-dom';


@withRouter
class UserCard extends React.Component{
    static propType = {
        userList:PropTypes.array.isRequired
    }
    handleClick(val){
        // console.log(val)
        this.props.history.push(`chat/${val._id}`)
    }
    render(){
        return(
            <WingBlank>
            <WhiteSpace />
            {this.props.userList.map(val=>(
                val.avatar?(<Card 
                    key={val._id}
                    onClick={()=>this.handleClick(val)}
                >
                    <WhiteSpace />
                    <Card.Header
                        title={val.user}
                        thumb={require(`../imgs/${val.avatar}.jpg`)}
                        thumbStyle={{width:45}}
                        extra={<span>{val.title}</span>}
                    ></Card.Header>
                    <Card.Body>
                        {/* //如果是牛人查询的是boss列表 */}
                        {val.type=='boss'?<div>公司：{val.company}</div>:null} 
                         <WhiteSpace />
                        {/* 根据换行符分割用户的描述 */}
                        {val.desc.split('\n').map((val2,index)=>(
                            <div key={index}>{val2}</div>
                        ))} 
                        <WhiteSpace />
                        {/* //如果查询的是boss列表 */}
                        {val.type=='boss'?<div>薪资：{val.money}</div>:null} 
                    </Card.Body> 
                </Card>):null
            ))

            }
        </WingBlank>
        )
    }
}

export default UserCard;