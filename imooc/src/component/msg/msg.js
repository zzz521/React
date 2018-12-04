import React from 'react';
import {connect} from 'react-redux';
import { List,Badge } from 'antd-mobile';



@connect(
    state=>state
)

class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1];
    }
    render(){
        console.log(this.props)
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(val=>{
            // msgGroup[val.chatid] = [] //这是错误的，
            msgGroup[val.chatid] = msgGroup[val.chatid] || []; //如果msgGroup对象下有当前的chatid这个属性，则不改变，如果没有，将它赋为一个空数组
            msgGroup[val.chatid].push(val);
        })

        // console.log(msgGroup)
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;   //函数内部有this，所以应该使用箭头函数,箭头函数内部的this指向Msg这个组件
            // console.log(this) 
            const b_last = this.getLast(b).create_time;
            console.log(a_last,b_last) 
            return b_last - a_last;//从大到小排序
        })
        // console.log(chatList);
        
        const userid = this.props.user._id;
        return  (
            <div>
                {chatList.map((val)=>{
                    console.log(val)
                    const lastItem = this.getLast(val); 
                    const targetId = lastItem.from == userid?lastItem.to:lastItem.from;
                    const unreadNum = val.filter(v=>!v.read&&v.to==userid).length
                    // console.log( targetId)

                    if(!this.props.chat.users[targetId]){
                        return null
                    }
                    const name = this.props.chat.users[targetId].name;
                    const avatar = this.props.chat.users[targetId].avatar;
                    return (
                        <List 
                        key={lastItem._id}
                        >
                            <List.Item 
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../imgs/${avatar}.jpg`)}
                                arrow='horizontal'
                                onClick={()=>{
                                    this.props.history.push(`chat/${targetId}`)
                                }}
                            >{lastItem.content}
                                <List.Item.Brief>
                                {name}
                                </List.Item.Brief>
                            </List.Item>
                        </List>
                    )
                })}
            </div>
        );
    }
}


export default Msg;