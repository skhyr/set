let express = require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(4000, () => console.log('server started') );
let io = socket(server);


app.get('/', function (req, res) {
    res.sendFile('index.html');
 })

const {wrongSet, userCanTry, addUser, getScoreboard, addPoint, userQuit, countNeeds, changeNeed, getUsersQuantity,
        prepareRoom,  deck, cardsOnTable,setcardsOnTable, getRandomCardFromDeck } = require('./users');

const isSetCorrect = (setToChek) =>{
    if(setToChek[1].color == setToChek[2].color && setToChek[2].color == setToChek[0].color);
    else if(setToChek[1].color != setToChek[2].color && setToChek[2].color != setToChek[0].color && setToChek[1].color != setToChek[0].color);
    else return false;

    if(setToChek[1].fill == setToChek[2].fill && setToChek[2].fill == setToChek[0].fill);
    else if(setToChek[1].fill != setToChek[2].fill && setToChek[2].fill != setToChek[0].fill && setToChek[1].fill != setToChek[0].fill);
    else return false;

    if(setToChek[1].symbol == setToChek[2].symbol && setToChek[2].symbol == setToChek[0].symbol);
    else if(setToChek[1].symbol != setToChek[2].symbol && setToChek[2].symbol != setToChek[0].symbol && setToChek[1].symbol != setToChek[0].symbol) console.log(4);
    else return false;

    if(setToChek[1].quantity == setToChek[2].quantity && setToChek[2].quantity == setToChek[0].quantity);
    else if(setToChek[1].quantity != setToChek[2].quantity && setToChek[2].quantity != setToChek[0].quantity && setToChek[1].quantity != setToChek[0].quantity);
    else return false;

    return true;
}

io.on('connect', (socket) => {
    
    socket.on('message', ({nickName, message, room})=>{
        io.to(room).emit('newMessage', {nickName, message});
        console.log(message);
    });

    socket.on('init', ({nickName, roomName}, callback)=>{
        socket.join(roomName);
        prepareRoom(roomName);
        const result = addUser({user: nickName, socketId: socket.id, room: roomName});
        if(result){
            io.to(roomName).emit('newUser', getScoreboard(roomName));
            callback(cardsOnTable(roomName));
        }
        else callback('error');
    });
    
    socket.on('trySet', ({ids, nickName, room}, callback)=>{
        if(!userCanTry(room, nickName)) return;
        let cardsMatchingOnTable = 0;
        cardsOnTable(room).forEach(e=>{ if(e.id===ids[0]){cardsMatchingOnTable++;return;} });
        cardsOnTable(room).forEach(e=>{ if(e.id===ids[1]){cardsMatchingOnTable++;return;} });
        cardsOnTable(room).forEach(e=>{ if(e.id===ids[2]){cardsMatchingOnTable++;return;} });
        if(cardsMatchingOnTable!=3) return callback(false);
        const setToCheck = ids.map((element =>{
            const index = cardsOnTable(room).findIndex(card=>{
                 return element==card.id;
            });
            return cardsOnTable(room)[index];
        }));
        if(!isSetCorrect(setToCheck)) {
            wrongSet(room, nickName);
            return callback(false);
        }
        addPoint(nickName, room);
        const scoreboard = getScoreboard(room);
        let newCards = [];
        if(deck(room).length!=0 && cardsOnTable(room).length<=12){ 
            for(let i = 0; i < 3; i++) newCards.push( getRandomCardFromDeck(room) );
            const newCards2 = newCards.map(e=>e);                  
            setcardsOnTable(room, 
                cardsOnTable(room).map(element => {
                if(element.id == ids[0] || element.id == ids[1] || element.id == ids[2]) return newCards2.pop();
                else return element;
            }));
            if(deck(room).length==0) newCards[2].quantity = null;
        } 
        else {
            newCards = null;
            setcardsOnTable(room, cardsOnTable(room).filter(e=> e.id!==ids[0] && e.id!==ids[1] && e.id!==ids[2] ));
        }
        io.to(room).emit('setFound', {ids, newCards, scoreboard});
        if(cardsOnTable(room).length===0) io.to(room).emit('gameEnd', scoreboard[0].name);
    });

    socket.on('noMoreSet', ({name, state, room})=>{
        changeNeed(name, state, room);
        console.log(countNeeds(room));

        if(countNeeds(room)*2 <= getUsersQuantity(room)  || cardsOnTable(room).length==18) return;
        if(deck(room).length==0){
            io.to(room).emit('gameEnd', getScoreboard(room)[0].name);
            return;
        }
        const tempCards = [];
        for(let i = 0; i < 3; i++){
             const t = getRandomCardFromDeck(room);
             cardsOnTable(room).push(t);
             tempCards.push(t);
        }
        if(deck(room).length==0) tempCards[2].quantity=null, tempCards[2].color=null, tempCards[2].fill=null, tempCards[2].symbol=null;
        io.to(room).emit('moreCards', tempCards);
    });

    socket.on('disconnect', ()=>{
        const room = userQuit(socket.id);
        io.to(room).emit('updatePlayersList', getScoreboard(room));
    });

});
