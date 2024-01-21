import { useEffect, useState, useRef } from 'react';
import '../../static/css/main.css';

function ChatRoomsListItem (props) {

    const authServerEndpoint = 'https://base64dev.pythonanywhere.com';
    const debugPrefix = "CHATROOM_LIST_ITEM:::::";
    const [className,setClassName] = useState("chatroom-list-item");


    const handleChatRoomSelection = () => {
        console.log("Clicked a chatroom!!!");
        props.setCurrentChatRoom(props.chatroom);
    }

    useEffect(() => {
        if(props.currentChatRoom){
            if(props.currentChatRoom.id == props.chatroom.id){
                setClassName("chatroom-list-item-selected");
            }
            else{
                setClassName("chatroom-list-item");
            }
        }
    },[props.currentChatRoom])
   
   return (
        <div className={className} onClick={handleChatRoomSelection}>
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