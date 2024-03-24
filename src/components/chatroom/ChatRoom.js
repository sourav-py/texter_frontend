
import React, { useState , useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faComments, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function ChatRoom (props) {

  console.log("-------CHATROOM---------");

  const userId = props.userId;
  const [chatLog,setChatLog] = useState([]);
  const [userActivityStatus,setUserActivityStatus] = useState(null);
  const [showIsTyping,setShowIsTyping] = useState(false);
  const [canInvokeTypingMessage,setCanInvokeTypingMessage] = useState(true);

  const authServerEndpoint = 'https://texter-backend.vercel.app/';
                                      

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
              <div className="h-full flex flex-col items-center justify-center">
                <div className="text-9xl mb-6 text-slate-600">
                  <FontAwesomeIcon icon={faPaperPlane}/>                  
                </div>
                <div className="text-2xl text-slate-600">
                    Select or add a chatroom
                </div>  
              </div>
            }
        
            {props.chatRoom && 
              <>
                <div className="flex flex-col h-full space-y-2">
                  <div class="flex flex-row mt-2 pl-4 gap-x-4 items-center h-[8%]">
                          <img className=" w-10 h-10" src={props.chatRoom.avatar ? authServerEndpoint + props.chatRoom.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
                          <div>
                            <div className="">{props.chatRoom.name}</div>
                            <div className="text-sm text-slate-700">
                              {showIsTyping ? "typing..." :  userActivityStatus}
                            </div>
                          </div>

                  </div>

                  <div className=" border-2 border-slate-200 rounded-lg bg-slate-200 h-[80%]" id="chat-log">

                    {
                      chatLog.map((message) => (
                          message
                      ))
                    }
                  </div>

                  <div className=" flex items-center  h-[7%]">
                      <form className=" flex flex-row items-center place-content-center w-full">
                        <input className=" p-4 h-8 w-[55%] mr-6 border-2 border-slate-600 rounded-xl" id="message" type="text" onKeyDown={handleKeyPress} placeholder='type your messsage'/>
                        <FontAwesomeIcon className = "text-3xl rotate-12 text-slate-600 hover:text-slate-400" onClick={handleMessageSubmit} icon={faPaperPlane} />
                      </form>
                  </div>
                </div> 
              </>
          }
        </>
  );
};

export default ChatRoom;