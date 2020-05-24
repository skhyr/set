const rooms = [];
class card {
    constructor(color, symbol, fill, quantity, id) {
      {
          this.color = color;
          this.symbol = symbol;
          this.fill = fill;
          this.quantity = quantity;
          this.id = id;
      }
    }
  }

const initGame = (room) =>{
    makeDeck(room);
    for(let i = 0; i < 12; i++) {
        cardsOnTable(room).push( getRandomCardFromDeck(room) );
    }
} 

function makeDeck(room){
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            for(let k = 0; k < 3; k++)
                for(let l = 1; l <= 3; l++){
                    let color, symbol, fill, quantity, id;
                    if(k==1)color = 'red';
                    else if(k==2)color = 'green';
                    else color = 'purple';

                    if(j==1)symbol = 'ovals';
                    else if(j==2) symbol = 'diamonds';
                    else symbol = 'squiggles';

                    if(i==1) fill = 'solid';
                    else if(i==2) fill = 'striped';
                    else fill = 'open';

                    quantity = l;
                    id=''+i+j+k+l;

                    rooms[room].deck.push( new card(color, symbol, fill, quantity, id) );
                }
}

const getRandomCardFromDeck = (room) => {
    return rooms[room].deck.pop();
    const rnd = Math.floor (Math.random() * (deck(room).length) );
    const elementToReturn = deck(room)[rnd];
    deck(room).splice(rnd, 1);
    return elementToReturn;
}

const initRoom = (name) =>{
       rooms[name] = {
            name,
            users: [],
            deck: [],
            cardsOnTable: [],
       };
       initGame(name);
}

const deck = (room) =>{
    return rooms[room].deck;
}

const cardsOnTable = (room) =>{
    return rooms[room].cardsOnTable;
}
const setcardsOnTable = (room, data) =>{
    rooms[room].cardsOnTable = data;
}

const prepareRoom = (room) =>{
    let temp = false;
    for(const i in rooms){
        if( rooms[i].name == room ) temp = true;
    }
    
    console.log(`Joining room ${room}\n status:${temp}`)
    if(!temp) initRoom(room);
}

const isUser = (user, room) =>{
    const temp = rooms[room].users.find(e=> user==e.name);
    if((typeof temp)  == 'undefined' )return 'null';
    else if(temp.online) return 'online';
    else return 'offline';
}

const addUser = ({user, socketId, room}) =>{
    if(user==null) return;
    const state = isUser(user, room);
    if(  state == 'online') return false;
    else if( state == 'offline') goOnline(user, room);
    else rooms[room].users.push({
        name: user,
        score: 0,
        online: true,
        need: false, 
        socketId: socketId
    });
    return true;
};

const goOnline = (user, room) =>{
    rooms[room].users.forEach(e=>{
        if(e.name==user){
            e.online = true;
            return;
        }
    });
}

const getScoreboard = (room) =>{
    const scoreboard = rooms[room].users.map(e=>{
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

const addPoint = (name, room) =>{
    rooms[room].users.forEach(e=>{
        if(e.name == name){
            e.score++;
        }
    });
}

const userQuit = socketId =>{
    let data;
    rooms.forEach(room=>{
        rooms[room].users.forEach(e=>{
            if(e.socketId == socketId){
                e.online = false;
                data = room;
                return e.name;
            }
        });
    });
    return data;
}

const countNeeds = (room) =>{
    let out = 0;
    rooms[room].users.forEach((e)=>{
        if(e.need == true) out ++;
    });
    return out;
}

const changeNeed = (name, state, room) =>{
    rooms[room].users.forEach(e=>{
        if(e.name == name){
            e.need = state;
        }
    });
}

const getUsersQuantity = (room) =>{
    let q = 0;
    rooms[room].users.forEach((e)=>{
        if(e.online==true) q++;
    });
    return q;
}

module.exports = { addUser, getScoreboard, addPoint, userQuit, countNeeds, changeNeed, getUsersQuantity,
                   prepareRoom, deck, cardsOnTable, setcardsOnTable, getRandomCardFromDeck };