import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import './Table.css';
import Card from '../Card/Card';
import {InfoContext} from '../InfoContext';
import {ScoreContext} from '../ScoreContext';

let socket;

const Table = ({history}) =>{
    const [deck, setDeck] = useState([]);
    const [selected, setSelected] = useState([]);
    const [winnerName, setWinnnerName] = useState('twoj stary');
    const [nickName, setNickName] = useContext(InfoContext); 
    const [score, setScore] = useContext(ScoreContext);
    const ENDPOINT = 'localhost:4000';

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit('init', nickName, (data) =>{
           if(data === 'error'){
                alert('user with this name already exists!!');
                history.push('/');
            }
            else setDeck(data);

        });
    },[ENDPOINT]);

    const animate = (e) =>{
        e.classList.remove("movements");
        void e.offsetWidth;
        e.classList.add("movements");
    }

    useEffect(() =>{
        
        socket.on('setFound', ({ids, newCards, scoreboard}) =>{    
            setScore(scoreboard);
            if(newCards!=null) 
            setDeck(deck.map(element => {
                const e = document.getElementById(element.id);
                if(element.id === ids[0]) {
                    animate(e);
                    return newCards[0];
                }
                else if(element.id === ids[1]) {
                    animate(e);
                    return newCards[1];
                }
                else if(element.id === ids[2]){
                    animate(e);
                    return newCards[2];
                }
                else return element;
            }));
            else setDeck(deck.filter(e=>{
                return e.id!== ids[0] && e.id!== ids[1] && e.id!== ids[2];
            }));
        });
        
        socket.on('moreCards', newCards=>{
            setDeck([...deck, ...newCards]);
            console.log(deck.length);
        });
        
        socket.on('newUser', users=>{
            setScore(users);
        });
        
        socket.on('gameEnd', name =>{
                setWinnnerName(name);         
                console.log(winnerName);
                document.querySelector(".winner").style.display = "block";            
        });
        
        return () => {
            socket.off();
        }
    }, [deck]);
    
    useEffect(()=>{
        
        if(selected.length === 3){ 
            socket.emit('trySet', {ids:selected, nickName}, (answer)=>{
                answer ? 
                alert('good')
                : alert('bad');
            });
            selected.forEach(el=>{
                document.getElementById(el).classList.remove('selectedCard');
            });
            setSelected([]);
        }
    },[selected]);
    
    function selectCard(id) {
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

    const randomF = () =>{
        socket.emit('noMoreSet');
    }

    return(
        <div className='Table'>
        <button onClick={randomF} >Wincyj</button>
            {deck.map((card, i)=> <Card key={i} card={card} click={()=>selectCard(card.id)} /> )}
        <div  className='winner'> <div className='center'>  <div className='winnerSubtext'>the winner is:</div>{winnerName}</div>  </div>
        </div>
    );
};
export default Table;