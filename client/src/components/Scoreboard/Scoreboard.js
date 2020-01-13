import React, {useState, useContext} from 'react';
import './Scoreboard.css';
import {InfoContext} from '../InfoContext';

const Scoreboard = () =>{
    const [nickName, setNickName] = useContext(InfoContext); 
    return(
        <div className='Scoreboard' >
            <h2>Scoreboard</h2>
            <div>{nickName}</div>
            <div className='player'>Piotrek32</div>
            <div className='player'>mixi_999</div>
            <div className='player'>sicio</div>
            <div className='player'>michlelel5000</div>
        </div>
    )
}
export default Scoreboard;