import React from 'react';
import './Card.css';
import Symbols from '../symbols/Symbols.js';

const Card = ({card, click}) =>{

        const out = [];
        for(let i = 0; i < card.quantity; i++) out.push (<Symbols color = {card.color} symbol = {card.symbol} fill={card.fill} key={card.id+''+i} /> )
        return(
                <div className='card' onClick={click} id={card.id}>
                        {out}
                </div>
        );
};
export default Card;