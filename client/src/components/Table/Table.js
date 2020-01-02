import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Table.css';
import Card from '../Card/Card';

let socket;

const Table = () =>{
    const [deck, setDeck] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(()=>{
        socket = io('localhost:4000');
        socket.emit('newUser', 'e', (data) =>{
            setDeck(data);
        });
        console.log('oo');
    },[]);

    useEffect(() =>{
        console.log('n');
        socket.on('setFound', ({ids, newCards}) =>{                   
            setDeck(deck.map(element => {
                if(element.id === ids[0]) return newCards[0];
                else if(element.id === ids[1]) return newCards[1];
                else if(element.id === ids[2]) return newCards[2];
                else return element;
            }));
        });
    });

    useEffect(()=>{
        if(selected.length === 3){ 
            socket.emit('trySet', [selected], (answer)=>{
                answer ? alert('good') : alert('bad');
            });

            selected.forEach((el)=>{
                document.getElementById(el).classList.remove('selectedCard');
            });
            setSelected([]);
        }
    },[selected]);

    function selectCard(id) {
        setSelected([...selected, id]);
        document.getElementById(id).classList.add('selectedCard');
    };

    return(
        <div>
            {deck.map((card, i)=> <Card key={i} card={card} click={()=>selectCard(card.id)} /> )}
        </div>
    );
};
export default Table;