import React, {useState, useContext} from 'react';
import {InfoContext} from './InfoContext';
import Scoreboard from './Scoreboard/Scoreboard';
import './Rooms.css';

const Rooms = ({history}) =>{
    const [nickName, setNickName] = useContext(InfoContext);
    
    const inputUpdate = e => {
        setNickName(e.target.value);
    }
    
    const buttonClick = (e) =>{
        e.preventDefault();
        history.push('/game');
    }


   return (
    <div className='Rooms'>
        <form className='formBox'>
            <h1>Join the game</h1>  

                <input placeholder='nickname' type="text" id='loginy' onChange={inputUpdate} autoComplete='off' />
            
                <input  placeholder='room' type="text" />

                <button className='goButton' onClick={buttonClick}>Play</button>
           
        </form>
    </div>
    );
}

export default Rooms;










