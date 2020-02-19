import React, {useState, createContext} from 'react';

export const InfoContext = createContext();

export const InfoProvider = props => {
    const [nickName, setNickName] = useState(null);
    
    return(
        <InfoContext.Provider value={[nickName, setNickName]}>
            {props.children}
        </InfoContext.Provider>
    );
} ;