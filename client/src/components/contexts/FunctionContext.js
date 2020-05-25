import React, {useState, createContext} from 'react';

export const FunctionContext = createContext();

export const FunctionProvider = props => {
    
    const [need, setNeed] = useState(false);
    const [socket, setSocket] = useState();
    
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
        <FunctionContext.Provider value={ {need, changeNeed, changeNeedFalse, socket, setSocket} } >
            {props.children}
        </FunctionContext.Provider>
    );
} ;