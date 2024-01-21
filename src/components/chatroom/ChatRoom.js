
import React, { useState , useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Message from './Message';
import '../../static/css/main.css';
import '../../static/css/chatroom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';


function ChatRoom (props) {

  console.log("-------CHATROOM---------");

  const userId = props.userId;
  const [chatLog,setChatLog] = useState([]);
  const [userActivityStatus,setUserActivityStatus] = useState(null);
  const [showIsTyping,setShowIsTyping] = useState(false);
  const [canInvokeTypingMessage,setCanInvokeTypingMessage] = useState(true);

  const authServerEndpoint = 'https://base64dev.pythonanywhere.com/';
                                      

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://127.0.0.1:8000'
                                        + '/ws/chat/'
                                        + (props.chatRoom && props.chatRoom.id)
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
                  "chatRoomId": props.chatRoom.id
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

        
        if(props.chatRoom){
          const interval = setInterval(() => {
              const requestData = {
                  'chatroomId': props.chatRoom.id,
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

  },[props.chatRoom])

  useEffect(() => {
    if (lastMessage !== null) {
        console.log("Recieving message::::messageData: ",JSON.parse(lastMessage.data).message);
        var messageData = JSON.parse(lastMessage.data).message; 

        var message = messageData.body;
        var senderId = messageData.userId;
        var messageType = messageData.type;

        console.log(messageType);

        if(messageType === "textMessage"){
          setChatLog(prevChatLog => [...prevChatLog,<Message key={prevChatLog.length} userId = {userId} senderId = {senderId} message={message}/>]);
          props.handleLastMessageTimestampUpdate();
        }
        else if(messageType === "typing" && senderId != userId){
           setShowIsTyping(true);
           setTimeout(() => {
              setShowIsTyping(false); 
           }, 2000); 
        }
        
    }
  }, [lastMessage]);


  const handleMessageSubmit = async (e) => {
        e.preventDefault();
        const message = document.querySelector('#message').value;

        if(message.length){
          sendMessage(JSON.stringify({
                  'userId': userId,
                  'messageType': "textMessage",
                  'message': message
          }));
          document.querySelector('#message').value = '';
        }
  }

  const handleKeyPress = async (e) => {
    console.log("handle key press")

    if(canInvokeTypingMessage){
      sendMessage(JSON.stringify(
        {
          'userId': userId,
          "messageType": "typing",
          "message": "dummy",
        }
      ));
    }

    setCanInvokeTypingMessage(false);
    setTimeout(() => {
        setCanInvokeTypingMessage(true); 
    }, 3000);
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <>

            {!props.chatRoom && 
              <div className="start-chatting-wrapper">
                <div className="start-chatting">
                  <FontAwesomeIcon icon={faComments}/>                  
                </div>
                <div className="welcome-text">
                    Happy texting....
                </div>  
              </div>
            }
        
            {props.chatRoom && 
              <div className="chatroom">
                <div class="chatroom-info">
                  {props.chatRoom &&
                      <>
                      <div className="chatroom-avatar-wrapper">
                        <img className="chatroom-avatar" src={props.chatRoom.avatar ? authServerEndpoint + props.chatRoom.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
                      </div>
                        <div className="chatroom-name-wrapper">
                          <div className="chatroom-name">{props.chatRoom.name}</div>
                          <div className="activity-status">
                            {showIsTyping ? "typing..." :  userActivityStatus}
                          </div>
                        </div>

                        <div className="chatroom-options">
                        </div>
                      </>
                  }
              </div>

              <div class="messages-window" id="chat-log">
                {
                  chatLog.map((message) => (
                      message
                  ))
                }
              </div>

              <div class="message-input-window">
                  <form className="message-input-wrapper">
                    <input className="message-input" id="message" type="text" onKeyDown={handleKeyPress} placeholder='type your messsage'/>
                    <input className="send-message-btn" type="submit" value="Send" onClick={handleMessageSubmit}></input>
                  </form>
              </div>
          </div> 
          }
        </>
  );
};

export default ChatRoom;