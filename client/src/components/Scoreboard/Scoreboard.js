import React, {useState, useContext} from 'react';
import './Scoreboard.css';
import {InfoContext} from '../InfoContext';
import {ScoreContext} from '../ScoreContext';

const Scoreboard = () =>{
    const [nickName, setNickName] = useContext(InfoContext); 
    const [score, setScore] = useContext(ScoreContext); 

    return(
        <div className='Scoreboard' >
            <h2 className='hs'>Scoreboard</h2>
                {score.map((e, id)=>{
                    {if(e.name===nickName) return <div key={id} className='u'> {(id+1) + '. ' + e.name + ' ' + e.score} </div>}

                    return <div key={id}> {(id+1) + '. ' + e.name + ' ' + e.score} </div>
                })}
            
         </div>
    )
}
export default Scoreboard;