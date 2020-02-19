import React, {useContext, useEffect} from 'react';
import {InfoContext} from './contexts/InfoContext';
import Table from './Table/Table';
import Scoreboard from './Scoreboard/Scoreboard';
import './Game.css';

const Game = ({history}) =>{
    const [nickName, setNickName] = useContext(InfoContext);

    useEffect(()=>{
        if(nickName === 'init') history.push('/');
    });

    return (
    <div className='Game' >
        <Table  history={history} />
        <Scoreboard />
        
    </div>
    );
}

export default Game;