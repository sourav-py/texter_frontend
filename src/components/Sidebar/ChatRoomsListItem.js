import { useEffect, useState, useRef } from 'react';
import '../../static/css/main.css';

function ChatRoomsListItem (props) {

    const authServerEndpoint = 'http://127.0.0.1:8000';
    const debugPrefix = "CHATROOM_LIST_ITEM:::::";


    const handleChatRoomSelection = () => {
        console.log("Clicked a chatroom!!!");
        props.setCurrentChatRoomId(props.chatroom.id);
        props.setCurrentChatRoom(props.chatroom);
    }

   
   return (
        <div class="chatroom-list-item" onClick={handleChatRoomSelection}>
            <div class="chatroom-list-item-avatar-wrapper">
                <img class="chatroom-list-item-avatar" src={props.chatroom.avatar ? authServerEndpoint + props.chatroom.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            </div>
            <div class="chatroom-list-item-name-message-wrapper">
                <div class="chatroom-list-item-name">
                    <p>{props.chatroom.name}</p>
                </div>
                <div class="chatroom-list-item-lastmessage">
                </div>
            </div>
        </div>
   ) 
}

export default ChatRoomsListItem;