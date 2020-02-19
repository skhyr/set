const users = [];

const isUser = (user) =>{
    const temp = users.find(e=> user==e.name);
    if((typeof temp)  == 'undefined' )return 'null';
    else if(temp.online) return 'online';
    else return 'offline';
}

const addUser = (user) =>{
    if(user==null) return;
    const state = isUser(user);
    if(  state == 'online') return false;
    else if( state == 'offline') goOnline(user);
    else users.push({
        name: user,
        score: 0,
        online: true,
        need: false
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


const removeUser = () =>{

}

const getUser = (user) =>{
    users.forEach(e=>{
        
    });
}

const getAllUsersNames = () =>{
    return users.map(e=> {return e.name});
}

const getScoreboard = () =>{
    const scoreboard = users.map(el=>{
        return {
            name: el.name,
            score: el.score
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

const userQuit = name =>{
    users.forEach(e=>{
        if(e.name == name){
            e.online = false;
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
    return users.length;
}

module.exports = { addUser, getUser, getAllUsersNames, getScoreboard, addPoint, userQuit, countNeeds, changeNeed, getUsersQuantity};