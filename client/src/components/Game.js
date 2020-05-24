import React, {useContext, useEffect} from 'react';
import {InfoContext} from './contexts/InfoContext';
import Table from './Table/Table';
import Scoreboard from './Scoreboard/Scoreboard';
import './Game.css';

const Game = ({history}) =>{
    const {nickName} = useContext(InfoContext);

    if(nickName === null){
        history.push('/');
        return( <div></div> );
    }
    else return (
            <div className='Game' >
                <Table  history={history} />
                <Scoreboard />
            </div>
            );
}

export default Game;