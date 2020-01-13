import React, {useState, useContext} from 'react';
import {InfoContext} from './InfoContext';
import Scoreboard from './Scoreboard/Scoreboard'

const Rooms = () =>{
    const [nickName, setNickName] = useContext(InfoContext);
    
    const inputUpdate = e => {
        setNickName(e.target.value);
    }
    
    const buttonClick = (e) =>{
        e.preventDefault();
        
    }


   return (
    <div>
    <h1>Rooms</h1>
    <form>
        <input type="text" onChange={inputUpdate} />
        <button onClick={buttonClick}>Submit</button>
    </form>
    <a href="game">t</a>
   <h3>{nickName}</h3>
   <Scoreboard></Scoreboard>
    </div>
    );
}

export default Rooms;