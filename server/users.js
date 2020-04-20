const users = [];

const isUser = (user) =>{
    const temp = users.find(e=> user==e.name);
    if((typeof temp)  == 'undefined' )return 'null';
    else if(temp.online) return 'online';
    else return 'offline';
}

const addUser = ({user, socketId}) =>{
    if(user==null) return;
    const state = isUser(user);
    if(  state == 'online') return false;
    else if( state == 'offline') goOnline(user);
    else users.push({
        name: user,
        score: 0,
        online: true,
        need: false, 
        socketId: socketId
    });
    return true;
};

const goOnline = (user) =>{
    users.forEach(e=>{
        if(e.name==user){
            e.online = true;
            return;
        }
    });
}

const getScoreboard = () =>{
    const scoreboard = users.map(e=>{
        return {
            name: e.name,
            score: e.score,
            online: e.online
        }
    });
    scoreboard.sort((a, b)=>{
        return a.score < b.score;
    });
    return scoreboard;
}

const addPoint = (name) =>{
    users.forEach(e=>{
        if(e.name == name){
            e.score++;
        }
    });
}

const userQuit = socketId =>{
    users.forEach(e=>{
        if(e.socketId == socketId){
            e.online = false;
            return e.name;
        }
    });
}

const countNeeds = () =>{
    let out = 0;
    users.forEach((e)=>{
        if(e.need == true) out ++;
    });
    return out;
}

const changeNeed = (name, state) =>{
    users.forEach(e=>{
        if(e.name == name){
            e.need = state;
        }
    });
}

const getUsersQuantity = () =>{
    let q = 0;
    users.forEach((e)=>{
        if(e.online==true) q++;
    });
    return q;
}

module.exports = { addUser, getScoreboard, addPoint, userQuit, countNeeds, changeNeed, getUsersQuantity};