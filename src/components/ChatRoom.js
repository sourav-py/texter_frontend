import '../static/css/chatroom.css';

function ChatRoom (props) {

    console.log("------CHATROOM------");
    let chatRoomId = props.chatRoomId;
    const userId = props.userId;

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
    chatSocket.onmessage = function(e) {
        var messageData = JSON.parse(e.data);
        var message = messageData.message;
        //append it to the chatbox along with other messages

        console.log("Message recieved: ", message)
    }

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };


    return (
        <div class="chatroom">
            <div class="chatroom-info">
                <p>Chat Room Number {chatRoomId}</p>
            </div>
            <div class="messages-window">
            </div>
            <div class="message-input-window">
            </div>
        </div>
    )
}

export default ChatRoom;