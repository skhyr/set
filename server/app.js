let express = require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(4000, () => console.log('server started') );
app.use(express.static('public'));

let io = socket(server);

const {addUser, getUser, getAllUsersNames, getScoreboard, addPoint, userQuit} = require('./users');

const deck = [];
let cardsOnTable = [];

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

function makeDeck(){
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

                    deck.push( new card(color, symbol, fill, quantity, id) );
                }
}

const getRandomCardFromDeck = () => {
    //return deck.pop();
    const rnd = Math.floor (Math.random() * (deck.length) );
    const elementToReturn = deck[rnd];
    deck.splice(rnd, 1);
    return elementToReturn;
}

initGame = () =>{
    makeDeck();
    for(let i = 0; i < 12; i++) {
        cardsOnTable.push( getRandomCardFromDeck() );
    }
} 
initGame();

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

    socket.on('init', (nickName, callback)=>{
        const result = addUser(nickName);
        if(result){
            io.sockets.emit('newUser', getScoreboard());
            callback(cardsOnTable);
        }
        else callback('error');
        console.log(getAllUsersNames());
    });
    
    socket.on('trySet', ({ids, nickName}, callback)=>{
        //io.sockets.emit('gameEnd', nickName);
        let good = 0;
        cardsOnTable.forEach(e=>{ if(e.id===ids[0]){good++;return;} });
        cardsOnTable.forEach(e=>{ if(e.id===ids[1]){good++;return;} });
        cardsOnTable.forEach(e=>{ if(e.id===ids[2]){good++;return;} });
        if(good!=3) {callback(false); return;}

        const setToCheck = ids.map((element =>{
            const index = cardsOnTable.findIndex(card=>{
                 return element==card.id;
            });
            return cardsOnTable[index];
        }));

        if(isSetCorrect(setToCheck)){
            const scoreboard = getScoreboard();
            addPoint(nickName);
            let newCards;

            if(deck.length!=0){
                newCards = []; 
                for(let i = 0; i < 3; i++) newCards.push( getRandomCardFromDeck() );
                const newCards2 = newCards.map(e=>e);                  
                cardsOnTable = cardsOnTable.map(element => {
                    if(element.id == ids[0] || element.id == ids[1] || element.id == ids[2]) return newCards2.pop();
                    else return element;
                });
            } 
            else {
                newCards = null;
                cardsOnTable = cardsOnTable.filter(e=> e.id!==ids[0] && e.id!==ids[1] && e.id!==ids[2] );
            }
            
            console.log(cardsOnTable.length);
            io.sockets.emit('setFound', {ids, newCards, scoreboard});
            if(cardsOnTable.length===0)io.sockets.emit('gameEnd', nickName);
        }

        else callback(false);
    });

});
