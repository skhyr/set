import React/*, { useState, useEffect }*/ from 'react';
import './Card.css';


const Card = ({card, click}) =>{

let shape = <span><div className={card.color+' diamond-left'}></div>{card.symbol} {card.fill}<div className={'diamond-right ' + card.color}></div></span>;
let cardImage = [];

const cardImageF = () =>{
    for(let i = 0; i < card.quantity; i++) cardImage.push(shape);
}
cardImageF();

return(
        <div className='card' onClick={click} id={card.id}>
            
        {cardImage.map((e, i)=><div className='shape' key={i}> {e} </div>)}

        </div>
    );
};
export default Card;