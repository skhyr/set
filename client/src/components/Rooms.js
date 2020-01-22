import React, {useState, useContext} from 'react';
import {InfoContext} from './InfoContext';
import Scoreboard from './Scoreboard/Scoreboard';

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
    <div>
    <h1>Rooms</h1>
    <form>
        <input type="text" onChange={inputUpdate} />
        <button onClick={buttonClick}>Submit</button>
    </form>
    
   <h3>{nickName}</h3>
    </div>
    );
}

export default Rooms;