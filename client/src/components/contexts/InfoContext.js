import React, {useState, createContext} from 'react';

export const InfoContext = createContext();

export const InfoProvider = props => {
    const [nickName, setNickName] = useState(null);
    const [roomName, setRoomName] = useState(null);
    const [messages, setMessages] = useState([]);
    
    return(
        <InfoContext.Provider value={ { messages, setMessages, nickName, setNickName, roomName, setRoomName} }>
            {props.children}
        </InfoContext.Provider>
    );
} ;