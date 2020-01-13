import React from 'react';

import './Game.css';
import Table from './Table/Table';
import Scoreboard from './Scoreboard/Scoreboard';

const Game = () =>{
   return (
    <div className='Game' >
        <Table />
        <Scoreboard />
    </div>
    );
}

export default Game;