import React, {useState, useContext} from 'react';
import './Scoreboard.css';
import {InfoContext} from '../contexts/InfoContext';
import {ScoreContext} from '../contexts/ScoreContext';
import {FunctionContext} from '../contexts/FunctionContext';

const Scoreboard = () =>{
    const [nickName, setNickName] = useContext(InfoContext); 
    const [score, setScore] = useContext(ScoreContext);
    const {need, changeNeed} = useContext(FunctionContext);
    const buttonClass = need ? "clicked" : "unclicked";

    const buttonAction = () => {
        changeNeed();
    }


    let eee;
    if(need) eee = "true";
    else eee = "false";

    return(
        <div className='Scoreboard' >
            <h2 className='hs'>Scoreboard</h2>
                <div className="playersList">
                    {score.map((e, id)=>{
                        {if(e.name===nickName) return <div key={id} className='u'> {(id+1) + '. ' + e.name + ' ' + e.score} </div>}
                        return <div key={id}> {(id+1) + '. ' + e.name + ' ' + e.score} </div>
                    })}
                </div>
            
            <button onClick={buttonAction} className={buttonClass} > more cards </button>
         </div>
    )
}
export default Scoreboard;