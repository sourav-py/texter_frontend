
import React, { useState , useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Message from './Message';

import '../static/css/chatroom.css';


function ChatRoom (props) {
  //Public API that will echo messages sent to it back to the client
  const chatRoomId = props.chatroomId != null ? props.chatroomId : 6;
  const userId = props.userId;

  const [chatLog,setChatLog] = useState([]);

  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000'
                                        + '/ws/chat/'
                                        + chatRoomId
                                        + '/?userId'
                                        + userId
                                    );
  
                                    

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
        console.log("Recieving message::::messageData: ",JSON.parse(lastMessage.data).message);
        var messageData = JSON.parse(lastMessage.data).message; 

        var message = messageData.body;
        var senderId = messageData.userId;
        var messageType = messageData.messageType;

        if(messageType !== "typing"){
          setChatLog(prevChatLog => [...prevChatLog,<Message key={prevChatLog.length} senderId = {senderId} message={message}/>]);
        }
        
    }
  }, [lastMessage]);


  const handleMessageSubmit = async (e) => {
        e.preventDefault();
        const message = document.querySelector('#message').value;

        sendMessage(JSON.stringify({
                'userId': userId,
                'messageType': "textMessage",
                'message': message
        }));
        document.querySelector('#message').value = '';
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div class="chatroom">

            <div class="chatroom-info">
                <p>Chat Room Number {chatRoomId}</p>
            </div>

            <div class="messages-window" id="chat-log">
              {
                chatLog.map((message) => (
                  message
                ))
              }
            </div>

            <div class="message-input-window">
                <form>
                    <input id="message" type="text" placeholder='type your messsage'/>
                    <input type="submit" onClick={handleMessageSubmit}></input>
                </form>
            </div>

        </div>
  );
};

export default ChatRoom;