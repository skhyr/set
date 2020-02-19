import React, {useState, createContext} from 'react';

export const FunctionContext = createContext();

export const FunctionProvider = props => {
    
    const [need, setNeed] = useState(false);
    
    const changeNeed = () => {
        setNeed(!need);
    } 

    const changeNeedFalse = () => {
        setNeed(false);
    } 

    const getNeedState = () =>{
        return need;
    }

    return(
        <FunctionContext.Provider value={ {need, changeNeed, changeNeedFalse} } >
            {props.children}
        </FunctionContext.Provider>
    );
} ;