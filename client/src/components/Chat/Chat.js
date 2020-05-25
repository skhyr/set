import React, {useContext, useState, useEffect} from 'react';
import './Chat.css';
import { FunctionContext } from '../contexts/FunctionContext';
import { InfoContext, InfoProvider } from '../contexts/InfoContext';

const Chat = () =>{

    const { socket } = useContext(FunctionContext);
    const {nickName, roomName, messages} = useContext(InfoContext);
    
    const handleClick = (event) =>{
        event.preventDefault();
        const messageBox = document.querySelector('.Chat input');
        socket.emit('message', {room: roomName, nickName, message: messageBox.value });
        messageBox.value = "";
    }

    useEffect(() => {
        let scrollingElement = document.querySelector('.Chat .messagesScreen');
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }, [messages])
    
        return(
                <div className='Chat'>
                        <div className="messagesScreen">
                            {messages.map((element, index, array)=>(
                                <div key={index}>
                                {index === 0 || array[index-1].author !== array[index].author 
                                ? 
                                <div className={"message first "+  (element.author===nickName?"me":"")} >
                                    <div className="text">{element.message}</div>
                                    <div className="author">{element.author}</div>
                                </div>
                                : 
                                <div className={"message nth "+  (element.author===nickName?"me":"")}>
                                    <div className="text">{element.message}</div>
                                </div>}
                                </div>
                            ))}
                        </div>
                        <form className="options">
                            <input type="text"/>
                            <button onClick={handleClick}>send</button>
                        </form>
                </div>
        );
};
export default Chat;