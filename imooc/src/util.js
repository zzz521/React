//处理用户跳转的js


export function getRedirectPath({type,avatar}){
    //根据用户信息,返回一个跳转的url地址
    //user.type    /boss /niuren
    //user.avatat /bossinfo /niureninfo

    let url = (type==='boss')?'/boss':'/niuren';
    if(!avatar){
        url += 'info'
    }
    return url;
}

export function getChatId(fromid,toid){
    return [fromid,toid].sort().join('_');
}