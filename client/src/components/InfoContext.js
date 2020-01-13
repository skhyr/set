import React, {useState, createContext} from 'react';

export const InfoContext = createContext();

export const InfoProvider = props => {
    const [nickName, setNickName] = useState('init');
    const [roomName, setRoomName] = useState('');

    return(
        <InfoContext.Provider value={[nickName, setNickName]}>
            {props.children}
        </InfoContext.Provider>
    );
} ;