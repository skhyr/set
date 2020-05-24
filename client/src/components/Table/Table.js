import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import './Table.css';
import Card from '../Card/Card';
import {InfoContext} from '../contexts/InfoContext';
import {ScoreContext} from '../contexts/ScoreContext';
import {FunctionContext} from '../contexts/FunctionContext';
let socket;

const Table = ({history}) =>{
    const [deck, setDeck] = useState([]);
    const [selected, setSelected] = useState([]);
    const [winnerName, setWinnnerName] = useState('twoj stary');
    const {nickName, roomName} = useContext(InfoContext); 
    const [score, setScore] = useContext(ScoreContext);
    const {need, changeNeedFalse, changeNeed} = useContext(FunctionContext);
    const ENDPOINT = 'https://stormy-stream-31416.herokuapp.com';
    
    const animate = (e) =>{
        e.classList.remove("movements");
        void e.offsetWidth;
        e.classList.add("movements");
    }

    const selectCard = (id) =>{
        let isAlredySelected = false;
        selected.forEach(element=>{
            if(element === id) isAlredySelected=true;
        });
        if(isAlredySelected){
            setSelected( selected.filter(element=> {return element!==id}) );
            document.getElementById(id).classList.remove('selectedCard');
        }
        else {
            setSelected([...selected, id]);
            document.getElementById(id).classList.add('selectedCard');
        }
    };

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit('init', {nickName, roomName}, (data) =>{
           if(data === 'error'){
                alert('user with this name already exists!!');
                history.push('/');
            }
            else setDeck(data);

        });
    },[ENDPOINT]);


    useEffect(() =>{

        socket.on('setFound', ({ids, newCards, scoreboard}) =>{
            setScore(scoreboard);
            if(newCards!=null)
                setDeck(deck.map(element => {
                    const e = document.getElementById(element.id);
                    for(let i = 0; i < 3; i++){
                        if(element.id === ids[i]) {
                            e.classList.remove('selectedCard');
                            setSelected( selected.filter(el=> {return el!==element.id}) );
                            animate(e);
                            return newCards[i];
                        }
                    };
                    return element;
                }));
            else setDeck(deck.filter(e=>{
                return e.id!== ids[0] && e.id!== ids[1] && e.id!== ids[2];
            }));

        });
        
        socket.on('moreCards', newCards=>{
            deck.length===12
            ? setDeck([...deck, ...newCards])
            : setDeck([...newCards, ...deck]);
            changeNeedFalse();
        });
        
        socket.on('newUser', users=>{
            setScore(users);
        });
        
        socket.on('gameEnd', name =>{
                setWinnnerName(name);         
                document.querySelector(".winner").style.display = "block";            
        });

        socket.on('updatePlayersList', (data)=>{
            setScore(data);
        });
        
        return () => {
            socket.off();
        }

    }, [deck]);
    
    useEffect(()=>{
        if(selected.length === 3){ 
            socket.emit('trySet', {ids:selected, nickName, room: roomName}, (answer)=>{
                const proc = document.querySelector('.proc');
                proc.classList.remove("procAnimation");
                void proc.offsetWidth;
                proc.classList.add("procAnimation");
                if(!answer){
                    selected.forEach(el=>{
                        document.getElementById(el).classList.add('badCard');
                        setTimeout(() => {
                            document.getElementById(el).classList.remove('badCard');
                        }, 500);        
                    });
                } 
            });
            selected.forEach(el=>{
                document.getElementById(el).classList.remove('selectedCard');
            });
            setSelected([]);
        }
    },[selected]);
    

    useEffect(()=>{
        socket.emit('noMoreSet', {state: need, name: nickName, room: roomName});
    }, [need]);

    let prefix = [];
    if(deck.length<=15) prefix = [<div key='18824'></div>, <div key='1854624' ></div>, <div key='3735684'></div>];  
    let sufix = [];  
    if(deck.length<=12) sufix = [<div key='1475824'></div>, <div key='15678324'></div>, <div key='16524'></div>]; 

    return(
        <div className='Table'>
            {prefix}
            {deck.map(
                (card, i)=>
                <Card key={i} card={card} click={()=>selectCard(card.id)} /> 
                )}
            {sufix}
        <div  className='winner'> <div className='center'>  <div className='winnerSubtext'>the winner is:</div>{winnerName}</div>  </div>
                <div className="cooldown"><div className="proc" /></div>
        </div>
    );
};
export default Table;