import React, {useState, createContext} from 'react';

export const InfoContext = createContext();

export const InfoProvider = props => {
    const [nickName, setNickName] = useState(null);
    const [roomName, setRoomName] = useState(null);
    
    return(
        <InfoContext.Provider value={ {nickName, setNickName, roomName, setRoomName} }>
            {props.children}
        </InfoContext.Provider>
    );
} ;