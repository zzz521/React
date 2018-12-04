import axios from 'axios';
import {getRedirectPath} from '../util.js'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG'; //登陆出错或者注册出错显示的错误信息
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';  //cookie
//因为登陆和注册存储的state比较类似，所以和修改信息合并成一个
const AUTH_SUCCESS = 'AUTH_SUCCESS';

const LOGIN_OUT = 'LOGIN_OUT'
//新建reducer
const initState={
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}
export function user(state=initState,action){
    switch(action.type){
        // case REGISTER_SUCCESS:
        //     return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        // case LOGIN_SUCCESS:
        //     return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        case LOGIN_OUT:
            return {...initState,redirectTo:'/login'}
        default:
        return state
    }
   
}

//用户退出清除state

export function logoutSubmit(){
    return {type:LOGIN_OUT}
}
function errorMsg(msg){
    // return {type:ERRPR_MSG,msg:msg}
    return {msg,type:ERROR_MSG}//可以这么写，但是必须放在第一个，这是一个约定

}

function authSuccess(obj){
    const {pwd,...data} = obj;
    //这里将后端传过来的obj中的pwd过滤掉，让data等于除了pwd以外的一个对象
    return {type:AUTH_SUCCESS,payload:data}
}
// function registerSuccess(data){
//     return {type:REGISTER_SUCCESS,payload:data}
// }
// function loginSucess(data){
//     return {type:LOGIN_SUCCESS,payload:data}
// }

export function loadData(userinfo){ 
    return {type:LOAD_DATA,payload:userinfo}
}
//用户登陆操作
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名和密码不能为空');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{  
            if(res.status == 200&&res.data.code == 0){
                // console.log(res.data)
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg));//错误信息由后端来定
            }
        })
    }
}
//用户注册操作
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入');
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码和确认密码不同');
    }
    //异步写法
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status == 200&&res.data.code === 0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg));//错误信息由后端来定
            }
        }
        )
    }
}

  //用户设置信息操作
  export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status == 200&&res.data.code === 0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg));//错误信息由后端来定
            } 
        })
    }
  }


  