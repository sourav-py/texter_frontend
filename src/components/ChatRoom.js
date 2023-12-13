
import React, { useState , useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Message from './Message';

import '../static/css/chatroom.css';


function ChatRoom (props) {

  console.log("---------CHATROOM-----------");

  const userId = props.userId;
  const chatRoomId = props.chatRoomId;

  const [chatLog,setChatLog] = useState([]);
  const authServerEndpoint = 'http://127.0.0.1:8000/';
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000'
                                        + '/ws/chat/'
                                        + chatRoomId
                                        + '/?userId'
                                        + userId
                                    );
  
                                    

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
      const fetchMessages = async () => {
            fetch(authServerEndpoint + 'chat/messages/',{
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                  "chatRoomId": chatRoomId
                })
            })
            .then(
                response => {
                    if(response.status == 200){
                        response.json()
                        .then(
                            messagesData => {
                              setChatLog(messagesData.map((message) => (
                                  <Message userId = {props.userId} senderId = {message.sender} message={message.body}/>
                              )))
                            }
                        )
                    }
                }
            )
            .catch(
                error => {
                  console.log("Error::::",error);
                }
            );
         }

         fetchMessages();
  },[chatRoomId])

  useEffect(() => {
    if (lastMessage !== null) {
        console.log("Recieving message::::messageData: ",JSON.parse(lastMessage.data).message);
        var messageData = JSON.parse(lastMessage.data).message; 

        var message = messageData.body;
        var senderId = messageData.userId;
        var messageType = messageData.messageType;

        if(messageType !== "typing"){
          setChatLog(prevChatLog => [...prevChatLog,<Message key={prevChatLog.length} userId = {userId} senderId = {senderId} message={message}/>]);
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