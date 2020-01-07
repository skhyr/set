import React/*, { useState, useEffect }*/ from 'react';
import './Card.css';
import E from '../symbols/E.js';



const Card = ({card, click}) =>{
return(
        <div className='card' onClick={click} id={card.id}>
                {card.color}<br/>
                {card.symbol}<br/>
                {card.fill}<br/>
                {card.quantity}<br/>
                <E color = {card.color}/>
        </div>
    );
};
export default Card;