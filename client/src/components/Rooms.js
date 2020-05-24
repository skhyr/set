import React, { useContext} from 'react';
import {InfoContext} from './contexts/InfoContext';
import './Rooms.css';

const Rooms = ({history}) =>{
    const {nickName, setNickName, roomName, setRoomName} = useContext(InfoContext);
    
    const input1Update = e => {
        setNickName(e.target.value);
    }
    const input2Update = e => {
        setRoomName(e.target.value);
    }

    const buttonClick = (e) =>{
        e.preventDefault();
        history.push('/game');
    }


   return (
    <div className='Rooms'>
        <form className='formBox'>
            <h1>Join the game</h1>  

                <input placeholder='nickname' type="text" id='loginy' onChange={input1Update} autoComplete='off' />
            
                <input  placeholder='room' type="text" id='pokoje' onChange={input2Update} autoComplete='off' />

                <button className='goButton' onClick={buttonClick}>Play</button>
           
        </form>
    </div>
    );
}

export default Rooms;










