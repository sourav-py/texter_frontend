
import React, { useState , useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Message from './Message';
import '../static/css/main.css';
import '../static/css/chatroom.css';


function ChatRoom (props) {

  console.log("-------CHATROOM---------");

  const userId = props.userId;
  const [chatLog,setChatLog] = useState([]);
  const [userActivityStatus,setUserActivityStatus] = useState(null);
  const authServerEndpoint = 'http://127.0.0.1:8000/';
                                      

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://127.0.0.1:8000'
                                        + '/ws/chat/'
                                        + props.chatRoomId
                                        + '/?userId'
                                        + userId);

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
                  "chatRoomId": props.chatRoomId
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

        
        if(props.chatRoomId){
          const interval = setInterval(() => {
              const requestData = {
                  'chatroomId': props.chatRoomId,
                  'userId': props.userId
              }
              fetch(authServerEndpoint + 'auth/activitystatus/?action=fetch',{
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              credentials: 'include',
              headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(requestData) 
            })
            .then(
                (response) => {
                  response.json()
                  .then(
                        (responseData) => {
                          console.log(responseData);
                          setUserActivityStatus(responseData.status);
                      }
                  )
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            );
            }, 5000); // Adjust the interval as needed
            
            fetchMessages();
            return () => clearInterval(interval);
          }

  },[props.chatRoomId])

  useEffect(() => {
    if (lastMessage !== null) {
        console.log("Recieving message::::messageData: ",JSON.parse(lastMessage.data).message);
        var messageData = JSON.parse(lastMessage.data).message; 

        var message = messageData.body;
        var senderId = messageData.userId;
        var messageType = messageData.messageType;

        if(messageType !== "typing"){
          setChatLog(prevChatLog => [...prevChatLog,<Message key={prevChatLog.length} userId = {userId} senderId = {senderId} message={message}/>]);
          props.handleLastMessageTimestampUpdate();
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
                {props.chatRoom &&
                    <>
                      <img height = "40px" src={props.chatRoom.avatar ? authServerEndpoint + props.chatRoom.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
                      <p>{props.chatRoom.name}</p>
                    </>
                }
                <p>{userActivityStatus}</p>
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