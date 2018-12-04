import axios from 'axios';
import io from 'socket.io-client'; 
const socket =  io('ws://localhost:9093');


const MSG_LIST = 'MSG_LIST';//获取聊天列表

const MSG_REVC = 'MSG_REVC';//读取信息

const MSG_READ = 'MSG_READ';//标识已读 

const initState = {
    chatmsg:[],  //聊天信息
    users:{},//聊天用户信息
    unread:0   //未读信息数量
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length}
        case MSG_REVC:  
            const n = action.payload.msg.to == action.payload.userid?1:0;
            return {...state,chatmsg:[...state.chatmsg,action.payload.msg],unread:state.unread+n};
        case MSG_READ:
        const num1 = state.unread-action.payload.num
            console.log(action.payload.num)
            const from = action.payload.from;
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from==v.from?true:v.read})),unread:state.unread-action.payload.num}
        default:
            return state; 
    }
}


function msgList(msgs,users,userid){
    return {type:MSG_LIST,payload:{msgs,users,userid}};
}
function msgRevc(msg,userid){
    return {type:MSG_REVC,payload:{msg,userid}};
}

function msgRead({from,userid,num}){
    // console.log(num)
    return {type:MSG_READ,payload:{from,userid,num}};
}
export function getMsgList(){
    return (dispatch,getState)=>{ //两个参数,第二个参数获取store中的state
        axios.get('/user/getmsglist')
        .then(res=>{
            if(res.status == 200 && res.data.code == 0){
                // console.log(getState());
                const userid = getState().user._id; //当前登陆用户的id
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}

export function sendMsg({from,to,msg}){
   return dispatch=>{  //redux下面的函数必须要return一个对象或者函数，否则就报错
    socket.emit('sendmsg',{from,to,msg});//发送给后端
   }
}

export function revcMsg(){
    return (dispatch,getState)=>{
        socket.on('revcmsg',function(data){
            const userid = getState().user._id;
            dispatch(msgRevc(data,userid))
        })
    }
}

export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
        .then(res=>{
            const userid = getState().user._id;
            if (res.status==200 && res.data.code==0) {
                dispatch(msgRead({from,userid,num:res.data.num}))
            }
        })
    }
}
