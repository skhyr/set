import React from 'react';
import './Symbols.css';
import {Squiggles, StripedSquiggles} from './Squiggles.js';
import {Diamonds, StripedDiamonds} from './Diamonds.js';
import {Ovals, StripedOvals} from './Ovals.js';

const Symbols = (props) =>{
    const {color, symbol, fill} = props;
    let output;
    let fillStyle;
    fill === 'solid' ? fillStyle = color :  fillStyle = 'none';


    if(symbol === "squiggles") fill !== 'striped' 
        ? output = <Squiggles stroke={color} fillStyle={fillStyle} /> : output = <StripedSquiggles stroke={color} fillStyle={fillStyle} />;
    else if(symbol === "diamonds") fill !== 'striped' 
        ? output = <Diamonds stroke={color} fillStyle={fillStyle} /> : output = <StripedDiamonds stroke={color} fillStyle={fillStyle} />;
    else if(symbol === "ovals") fill !== 'striped' 
        ? output =<Ovals stroke={color} fillStyle={fillStyle} /> : output = <StripedOvals stroke={color}fillStyle={fillStyle} />;

   return (
        <div className='svgContainer'>
            {output}
        </div>);
}

export default Symbols;