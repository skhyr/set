import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Table.css';
import Card from '../Card/Card';

let socket;

const Table = () =>{
    const [deck, setDeck] = useState([]);
    const [selected, setSelected] = useState([]);
    const ENDPOINT = 'localhost:4000';

    useEffect(()=>{
        socket = io(ENDPOINT);

        socket.emit('init', 'e', (data) =>{
            setDeck(data);
        });
    },[ENDPOINT]);

    useEffect(() =>{
        socket.on('setFound', ({ids, newCards}) =>{             
            setDeck(deck.map(element => {
                if(element.id === ids[0]) {
                    const e = document.getElementById(element.id);
                    e.classList.remove("movements");
                    void e.offsetWidth;
                    e.classList.add("movements");

                    return newCards[0];
                }
                else if(element.id === ids[1]) {
                    const e = document.getElementById(element.id);
                    e.classList.remove("movements");
                    void e.offsetWidth;
                    e.classList.add("movements");

                    return newCards[1];
                }
                else if(element.id === ids[2]){
                    const e = document.getElementById(element.id);
                    e.classList.remove("movements");
                    void e.offsetWidth;
                    e.classList.add("movements");

                    return newCards[2];
                }
                else return element;
            }));
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
          }
    }, [deck]);

    useEffect(()=>{
        
        if(selected.length === 3){ 
            socket.emit('trySet', [selected], (answer)=>{
                answer ? 
                    alert('good')
                : alert('bad');
            });
            selected.forEach(el=>{
                document.getElementById(el).classList.remove('selectedCard');
               // document.getElementById(el).classList.remove('movements');
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

    return(
        <div className='Table' >
            {deck.map((card, i)=> <Card key={i} card={card} click={()=>selectCard(card.id)} /> )}
        </div>
    );
};
export default Table;