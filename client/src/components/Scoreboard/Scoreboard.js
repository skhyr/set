import React, {useContext, useEffect} from 'react';
import './Scoreboard.css';
import {InfoContext} from '../contexts/InfoContext';
import {ScoreContext} from '../contexts/ScoreContext';
import {FunctionContext} from '../contexts/FunctionContext';

const Scoreboard = () =>{
    const [nickName] = useContext(InfoContext); 
    const [score] = useContext(ScoreContext);
    const {need, changeNeed} = useContext(FunctionContext);

    const buttonClass = need ? "clicked" : "unclicked";

    const buttonAction = () => {
        changeNeed();
    }

    return(
        <div className='Scoreboard' >
            <button onClick={buttonAction} className={buttonClass} > more cards </button>
            <h2 className='hs'>Scoreboard</h2>
                <div className="playersList">
                    {score.map((e, id)=>{
                        {if(e.name===nickName) return <div key={id} className='u'> {(id+1) + '. ' + e.name + ' ' + e.score} </div>}
                        {if(e.online===false) return <div key={id} className='offline'> {(id+1) + '. ' + e.name + ' ' + e.score} </div>}
                        return <div key={id}> {(id+1) + '. ' + e.name + ' ' + e.score} </div>
                    })}
                </div>
            
         </div>
    )
}
export default Scoreboard;