import { useRef, useState } from 'react';
import Message from './Message';

import '../static/css/chatroom.css';

function ChatRoom (props) {

    console.log("------CHATROOM------");
    let chatRoomId = props.chatRoomId;
    const userId = props.userId;

    const [chatLog,setChatLog] = useState([]);


    let messageRecieved = useRef(false);

    if(chatRoomId == null){
        chatRoomId = 6;
    }

    const chatSocket = new WebSocket(
            'ws://127.0.0.1:8000'
            + '/ws/chat/'
            + chatRoomId
            + '/?userId'
            + userId
        );

    console.log(chatSocket)

    //Recieve message from the web socket consumer
    //and append it to the chat log.
    chatSocket.onmessage = function(e) {

        //check if message is already recieved (prevents unclear multiple executions of this function)
        if(!messageRecieved){
            var messageData = JSON.parse(e.data);
            console.log("Recieving message::::messageData: ",messageData);
            var message = messageData.message;

            console.log("Recieving message:::userId: ",userId);

            setChatLog(prevChatLog => [...prevChatLog,<Message key={prevChatLog.length} message={message}/>]);

            messageRecieved = true;
        }
    }

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    //Send a message to the web socket consumer
    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        const message = document.querySelector('#message').value;

        messageRecieved = false;
        chatSocket.send(JSON.stringify({
                'userId': userId,
                'messageType': "textMessage",
                'message': message
        }));
        document.querySelector('#message').value = '';
    }

    return (
        <div class="chatroom">

            <div class="chatroom-info">
                <p>Chat Room Number {chatRoomId}</p>
            </div>

            <div class="messages-window" id="chat-log">
                {chatLog.map((element, index) => (
                    element
                ))}
            </div>

            <div class="message-input-window">
                <form>
                    <input id="message" type="text" placeholder='type your messsage'/>
                    <input type="submit" onClick={handleMessageSubmit}></input>
                </form>
            </div>

        </div>
    )
}

export default ChatRoom;