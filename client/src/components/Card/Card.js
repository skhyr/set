import React from 'react';
import './Card.css';
import Symbols from '../symbols/Symbols.js';
import Logo from './logoSet.png';

const Card = ({card, click}) =>{

        const out = [];
        for(let i = 0; i < card.quantity; i++) out.push 
        
        (<Symbols color = {card.color} symbol = {card.symbol} fill={card.fill} key={card.id+''+i} /> )
        
        /*return(
                <div className='card' onClick={click} id={card.id}>
                        set
                </div>
        );*/

        if(card.quantity===null) return(
                <div className='card hidden' onClick={click} id={card.id}>
                        <div className="imgBox">
                                <img src={Logo} alt="Smiley face"/>
                        </div>
                </div>
        );

        return(
                <div className='card' onClick={click} id={card.id}>
                        {out}
                </div>
        );
};
export default Card;