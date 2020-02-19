import React, {useState, createContext} from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = props => {
    const [score, setScore] = useState([{name: null, score: 0}]);
    
    return(
        <ScoreContext.Provider value={[score, setScore]}>
            {props.children}
        </ScoreContext.Provider>
    );
} ;