import React from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types'; //对属性进行验证 props


class AvatarSelector extends React.Component{
    static propTypes = {
        // selectAvator1:PropTypes.func //这个属性必须是一个函数  对它的类型进行检测
        //如果传进来的props属性不是函数，则会报错
        selectAvator1:PropTypes.func.isRequired  //isRequire代表必须要传这个属性，如果父组件没传则报错
    }
    constructor(){
        super()
        this.state={}
    }
    render(){
        const avatarList = ['head1','head2','head3','head4','head5','head6','head7','head8','head9']
            .map((val,index)=>({
                icon: require(`../imgs/${val}.jpg`),//requier代表引入图片
                // text: `head${index}`,
                text: `${val}`
            }))  //如果箭头函数直接返回一个对象，则应该用()括起来
        
        const girdHeader = this.state.icon?(<div>
            <span>已选择头像</span>&nbsp;
            <img src={this.state.icon} style={{width:20}}/> 
            {/* 这里style用两个中括号是因为怕浏览器以为css是一个对象 */}
            </div>):'请选择头像'
        return (
            <div>
                <List renderHeader={()=>girdHeader}>  
                {/* 在list的头部显示girdHeader,girdHeader代表的是一段js代码 */}
                    <Grid data={avatarList} columnNum={3} onClick={elem=>{ //elem这个参数是当前点击的对象{icon,text}
                        console.log(elem)
                        this.setState(elem);
                        console.log(this.state)
                        this.props.selectAvator1(elem.text);
                    }}/>
                </List>
            </div>
        )
    }
}


export default AvatarSelector;